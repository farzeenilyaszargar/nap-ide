import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { tokens } = body;

        if (typeof tokens !== 'number') {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Ideally use an RPC for atomic updates.
        // tailored to the SQL I provided, we will fetch and update.
        // For production, strictly recommend adding an RPC function.

        const { data: usage } = await supabase
            .from('user_usage')
            .select('tokens_used, requests_count')
            .eq('user_id', user.id)
            .single();

        const currentTokens = usage?.tokens_used || 0;
        const currentRequests = usage?.requests_count || 0;

        const { error: updateError } = await supabase
            .from('user_usage')
            .update({
                tokens_used: currentTokens + tokens,
                requests_count: currentRequests + 1,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id);

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
