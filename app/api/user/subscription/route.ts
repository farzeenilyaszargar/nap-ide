import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: usage, error } = await supabase
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

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found" which is fine for new users
            console.error("Subscription fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 });
        }

        // Default to Free plan structure if no usage record found
        const subscription = usage ? {
            planName: usage.plans?.name || 'Free',
            status: new Date(usage.plan_expiry_date) > new Date() ? 'active' : 'expired',
            expiryDate: usage.plan_expiry_date,
            limits: {
                tokens: usage.plans?.token_limit || 1000,
                requests: usage.plans?.request_limit || 100,
                devices: usage.plans?.device_limit || 1
            },
            usage: {
                tokens: usage.tokens_used,
                requests: usage.requests_count
            }
        } : {
            planName: 'Free',
            status: 'active',
            expiryDate: null,
            limits: { tokens: 1000, requests: 100, devices: 1 },
            usage: { tokens: 0, requests: 0 }
        };

        return NextResponse.json(subscription);

    } catch (err) {
        console.error("Subscription API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
