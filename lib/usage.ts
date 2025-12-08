import { createClient } from '@/lib/supabase/server'

export async function trackUsage(userId: string, tokens: number) {
    const supabase = await createClient()

    // RPC call could be optimized here if we created a stored procedure for atomic increments,
    // but for now we'll do a read-modify-write or a simple update if the row exists.
    // Actually, keeping it simple with an increment query is best.
    // Since Supabase JS client doesn't support atomic increment easily without a stored proc or raw sql,
    // we will try to call a stored procedure if we made one, or just use a raw RPC.

    // However, since I didn't create an increment RPC in the SQL (to keep it simple for the user),
    // I will fetch the current usage and update it. 
    // NOTE: This is not concurrency-safe for high volume, but fine for a start.
    // Ideally, we should add an 'increment_usage' function in SQL.

    // Let's rely on the API route for external calls, but for internal calls:
    const { data: usage, error } = await supabase
        .from('user_usage')
        .select('tokens_used, requests_count')
        .eq('user_id', userId)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching usage:', error)
        return
    }

    if (usage) {
        await supabase
            .from('user_usage')
            .update({
                tokens_used: (usage.tokens_used || 0) + tokens,
                requests_count: (usage.requests_count || 0) + 1,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', userId)
    } else {
        // Create if not exists (though the trigger should have handled it)
        await supabase
            .from('user_usage')
            .insert({
                user_id: userId,
                tokens_used: tokens,
                requests_count: 1
            })
    }
}
