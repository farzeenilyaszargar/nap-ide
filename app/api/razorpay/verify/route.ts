import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planName, // Changed from planId to planName
            amount
        } = await request.json();

        // 1. Verify Signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // 2. Initialize Supabase Admin Client (Bypass RLS)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 3. Get User ID from Order Notes (or pass it from client, but notes is safer if we fetched it from order)
        // For simplicity, we'll trust the client auth for now or fetch the order from Razorpay to be super safe.
        // Let's rely on the client passing the current user ID implicitly via session?
        // Wait, 'supabaseAdmin' doesn't know the session user.
        // We need to know WHICH user to update.
        // Option A: Pass userID in the body (insecure if not verified?).
        // Option B: Verify the user session using standard client, THEN use admin to write.

        // Let's do Option B: Verify auth first.
        const supabaseAuth = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        // Note: verifying session in a route handler without cookies is hard if we don't use the helper.
        // Actually, we can just use the helper to get the user, then use admin to update.

        const { createClient: createServerClient } = require("@/lib/supabase/server");
        const supabaseUserScope = await createServerClient();
        const { data: { user }, error: authError } = await supabaseUserScope.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 4. Get Plan Details by Name
        const { data: plan, error: planError } = await supabaseAdmin
            .from('plans')
            .select('*')
            .eq('name', planName)
            .single();

        if (planError || !plan) {
            console.error("Plan fetch error:", planError);
            return NextResponse.json({ error: `Plan '${planName}' not found` }, { status: 400 });
        }

        // 5. Update/Create User Usage using Admin Client
        const now = new Date();
        const expiry = new Date();
        expiry.setDate(now.getDate() + 30); // 30 Days validity

        const { data: existingUsage } = await supabaseAdmin
            .from('user_usage')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (existingUsage) {
            const { error: updateError } = await supabaseAdmin
                .from('user_usage')
                .update({
                    plan_id: plan.id,
                    plan_start_date: now.toISOString(),
                    plan_expiry_date: expiry.toISOString(),
                    tokens_used: 0, // Reset usage
                    requests_count: 0, // Reset usage
                    total_spent: optionalAdd(existingUsage.total_spent, amount),
                    updated_at: now.toISOString()
                })
                .eq('user_id', user.id);

            if (updateError) throw updateError;
        } else {
            const { error: insertError } = await supabaseAdmin
                .from('user_usage')
                .insert({
                    user_id: user.id,
                    plan_id: plan.id,
                    plan_start_date: now.toISOString(),
                    plan_expiry_date: expiry.toISOString(),
                    tokens_used: 0,
                    requests_count: 0,
                    total_spent: amount,
                });

            if (insertError) throw insertError;
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Payment Verification Error:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

function optionalAdd(a: number | null, b: number) {
    return (a || 0) + (b || 0);
}
