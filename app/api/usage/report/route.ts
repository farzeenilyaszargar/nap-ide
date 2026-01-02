import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        // Authenticate User
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Initialize Admin Client to bypass RLS
        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { endpoint, tokens, metadata } = await request.json();
        const tokensUsed = parseInt(tokens || 0);

        // 1. Log the usage event
        const { error: logError } = await supabaseAdmin
            .from('usage_logs')
            .insert({
                user_id: user.id,
                endpoint: endpoint || 'unknown',
                tokens_used: tokensUsed,
                metadata: metadata || {}
            });

        if (logError) {
            console.error("Usage logging error:", logError);
            return NextResponse.json({ error: "Failed to record usage log: " + logError.message }, { status: 500 });
        }

        // 2. Increment User Total Usage
        if (tokensUsed > 0) {
            // Fetch current usage
            const { data: usage } = await supabaseAdmin
                .from('user_usage')
                .select('tokens_used')
                .eq('user_id', user.id)
                .single();

            if (usage) {
                const { error: updateError } = await supabaseAdmin
                    .from('user_usage')
                    .update({
                        tokens_used: (usage.tokens_used || 0) + tokensUsed,
                        updated_at: new Date().toISOString()
                    })
                    .eq('user_id', user.id);

                if (updateError) {
                    console.error("Update total usage error:", updateError);
                    return NextResponse.json({ error: "Failed to update usage: " + updateError.message }, { status: 500 });
                }
            } else {
                // Create if not exists
                // Fetch Free Plan or any plan to set as default
                const { data: freePlan } = await supabaseAdmin
                    .from('plans')
                    .select('id')
                    .ilike('name', '%free%')
                    .limit(1)
                    .single();

                // If no specific free plan found, try getting ANY plan to satisfy FK, or assume nullable
                let planId = freePlan?.id;
                if (!planId) {
                    const { data: anyPlan } = await supabaseAdmin.from('plans').select('id').limit(1).single();
                    planId = anyPlan?.id;
                }

                const now = new Date();
                const expiry = new Date();
                expiry.setDate(now.getDate() + 30);

                const { error: insertError } = await supabaseAdmin
                    .from('user_usage')
                    .insert({
                        user_id: user.id,
                        plan_id: planId, // Can be null if not found and DB allows, otherwise might fail
                        tokens_used: tokensUsed,
                        requests_count: 1,
                        plan_start_date: now.toISOString(),
                        plan_expiry_date: expiry.toISOString(),
                        total_spent: 0,
                        updated_at: now.toISOString()
                    });

                if (insertError) {
                    console.error("Insert total usage error:", insertError);
                    return NextResponse.json({ error: "Failed to create usage record: " + insertError.message }, { status: 500 });
                }
            }
        }

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error("Usage Report API Error:", err);
        return NextResponse.json({ error: "Internal Server Error: " + err.message }, { status: 500 });
    }
}
