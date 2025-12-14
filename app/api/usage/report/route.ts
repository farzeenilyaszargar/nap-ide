import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { endpoint, tokens, metadata } = await request.json();
        const tokensUsed = parseInt(tokens || 0);

        // 1. Log the usage event
        const { error: logError } = await supabase
            .from('usage_logs')
            .insert({
                user_id: user.id,
                endpoint: endpoint || 'unknown',
                tokens_used: tokensUsed,
                metadata: metadata || {}
            });

        if (logError) {
            console.error("Usage logging error:", logError);
            // Decide if we fail the request or just log the error? 
            // Usually measuring usage is critical for billing.
            return NextResponse.json({ error: "Failed to record usage" }, { status: 500 });
        }

        // 2. Increment User Total Usage (if tokens were used)
        if (tokensUsed > 0) {
            // We use an RPC call if available for atomicity, or simple update for now.
            // Ideally: await supabase.rpc('increment_usage', { x: tokensUsed })

            // Fetch current to increment (Optimistic locking or stored proc is better, but this matches current codebase style)
            const { data: usage } = await supabase
                .from('user_usage')
                .select('tokens_used')
                .eq('user_id', user.id)
                .single();

            if (usage) {
                const { error: updateError } = await supabase
                    .from('user_usage')
                    .update({ tokens_used: (usage.tokens_used || 0) + tokensUsed })
                    .eq('user_id', user.id);

                if (updateError) console.error("Update total usage error:", updateError);
            }
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Usage Report API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
