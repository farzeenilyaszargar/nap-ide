import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // 1. Verify User (Auth Header should be handled by Supabase client automatically if cookies present, 
        // OR we can pass access_token if this is from a desktop app? 
        // Ideally desktop app sends Bearer token. Supabase createClient handles cookie-based auth. 
        // For Bearer token from a desktop app, we might need a different setup or ensure the desktop app sends the session cookie.
        // Assuming desktop app uses standard Supabase Auth behavior (sends header).

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized", valid: false }, { status: 401 });
        }

        const { device_id, device_name, platform } = await request.json();

        if (!device_id) {
            return NextResponse.json({ error: "device_id is required" }, { status: 400 });
        }

        // 2. Fetch Plan & Limits
        const { data: usage } = await supabase
            .from('user_usage')
            .select(`
                *,
                plans (
                    name,
                    token_limit,
                    request_limit,
                    device_limit
                )
            `)
            .eq('user_id', user.id)
            .single();

        // Default limits if no plan (Free)
        const deviceLimit = usage?.plans?.device_limit || 1;
        const planName = usage?.plans?.name || 'Free';
        const isSubscriptionValid = !usage?.plan_expiry_date || new Date(usage.plan_expiry_date) > new Date();

        // 3. Check Devices
        // Upsert this device first to update 'last_seen' or create it
        // BUT we need to check limit first if it doesn't exist?
        // Actually, best practice: Count existing unique devices.

        const { count, error: countError } = await supabase
            .from('devices')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (countError) {
            console.error("Device count error:", countError);
            return NextResponse.json({ error: "Validation failed" }, { status: 500 });
        }

        // Check if THIS device already exists
        const { data: existingDevice } = await supabase
            .from('devices')
            .select('id')
            .eq('user_id', user.id)
            .eq('device_id', device_id)
            .single();

        let deviceStatus = "active";

        if (!existingDevice) {
            // New device. Check limit.
            if ((count || 0) >= deviceLimit) {
                return NextResponse.json({
                    valid: false,
                    reason: "limit_exceeded",
                    message: `Device limit reached (${count}/${deviceLimit}). Please upgrade your plan or sign out of other devices.`
                }, { status: 403 });
            }
        }

        // 4. Register/Update Device (Upsert)
        const { error: upsertError } = await supabase
            .from('devices')
            .upsert({
                user_id: user.id,
                device_id: device_id,
                device_name: device_name || "Unknown Device",
                platform: platform || "unknown",
                last_seen: new Date().toISOString()
            }, { onConflict: 'user_id, device_id' });

        if (upsertError) {
            console.error("Device upsert error:", upsertError);
            return NextResponse.json({ error: "Failed to register device" }, { status: 500 });
        }

        // 5. Return Success
        return NextResponse.json({
            valid: true,
            user: {
                id: user.id,
                email: user.email
            },
            plan: {
                name: planName,
                isValid: isSubscriptionValid,
                expiry: usage?.plan_expiry_date,
                limits: {
                    devices: deviceLimit,
                    tokens: usage?.plans?.token_limit || 1000
                }
            },
            usage: {
                tokens: usage?.tokens_used || 0,
                requests: usage?.requests_count || 0
            }
        });

    } catch (err) {
        console.error("License Validation Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
