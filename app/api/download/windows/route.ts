import { NextResponse } from "next/server";

const RELEASES_FEED_URL =
  "https://downloads.nap-code.com/latest.yml";
const RELEASES_FALLBACK_URL =
  "https://downloads.nap-code.com";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(RELEASES_FEED_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.redirect(RELEASES_FALLBACK_URL, { status: 302 });
    }

    const yamlText = await response.text();
    const match = yamlText.match(/path:\s*(.+)/i);
    const fileName = match?.[1]?.trim();
    const target = fileName
      ? `${RELEASES_FALLBACK_URL}/${fileName}`
      : RELEASES_FALLBACK_URL;

    return NextResponse.redirect(target, { status: 302 });
  } catch {
    return NextResponse.redirect(RELEASES_FALLBACK_URL, { status: 302 });
  }
}
