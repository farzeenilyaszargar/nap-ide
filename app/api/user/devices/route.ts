import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: devices, error } = await supabase
            .from('devices')
            .select('*')
            .eq('user_id', user.id)
            .order('last_seen', { ascending: false });

        if (error) {
            console.error("Devices fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 });
        }

        return NextResponse.json({ devices });

    } catch (err) {
        console.error("Devices API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const deviceId = searchParams.get('id'); // Internal UUID of the device record

        if (!deviceId) {
            return NextResponse.json({ error: "Device ID required" }, { status: 400 });
        }

        const { error } = await supabase
            .from('devices')
            .delete()
            .eq('id', deviceId)
            .eq('user_id', user.id); // Ensure user owns the device

        if (error) {
            console.error("Device delete error:", error);
            return NextResponse.json({ error: "Failed to delete device" }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Devices API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
