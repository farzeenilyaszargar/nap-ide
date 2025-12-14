import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client"; // Use client for public read access (anon key is fine here due to public policy)

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const platform = searchParams.get('platform');
        const currentVersion = searchParams.get('current_version');

        if (!platform) {
            return NextResponse.json({ error: "Platform is required" }, { status: 400 });
        }

        // We can use the simple client since the table is public read
        const supabase = createClient();

        const { data: latest, error } = await supabase
            .from('app_versions')
            .select('*')
            .eq('platform', platform)
            .order('pub_date', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error("Update check error:", error);
            return NextResponse.json({ error: "Failed to check updates" }, { status: 500 });
        }

        if (!latest) {
            // No updates found at all
            return NextResponse.json({ message: "No updates available" }, { status: 204 });
        }

        // Optional: Compare versions if current_version is passed
        // For now, always return latest. Client decides if it needs to update.

        return NextResponse.json({
            version: latest.version,
            url: latest.download_url,
            notes: latest.release_notes,
            pub_date: latest.pub_date,
            mandatory: latest.is_mandatory
        });

    } catch (err) {
        console.error("Updates API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
