import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { refresh_token } = await request.json();

        if (!refresh_token) {
            return NextResponse.json({ error: "Refresh token required" }, { status: 400 });
        }

        const { data, error } = await supabase.auth.refreshSession({ refresh_token });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        return NextResponse.json({
            session: data.session,
            user: data.user
        });

    } catch (err) {
        console.error("Refresh API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
