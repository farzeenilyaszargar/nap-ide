import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // 1. Get Data from Request
        let allDevices = false;
        try {
            const body = await request.json();
            allDevices = body.all_devices;
        } catch (e) {
            // Body might be empty or invalid JSON, ignore
        }

        // 2. Create Admin Client if needed
        if (allDevices) {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const adminSupabase = createAdminClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.SUPABASE_SERVICE_ROLE_KEY!,
                    {
                        auth: {
                            autoRefreshToken: false,
                            persistSession: false
                        }
                    }
                );

                const { error: adminError } = await adminSupabase.auth.admin.signOut(user.id);
                if (adminError) {
                    console.error("Global sign out error:", adminError);
                    // We return 500 here? Or just proceed to local logout? 
                    // Better to warn but ensure local logout happens.
                }
            }
        }

        // 3. Local Sign Out (Clears Cookies)
        const { error: signOutError } = await supabase.auth.signOut();

        if (signOutError) {
            return NextResponse.json({ error: signOutError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Logout API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
