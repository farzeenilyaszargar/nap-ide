import { NextResponse } from "next/server";

const RELEASES_API_URL =
  "https://pub-e25e5e6494664382ac6f6979fa447e85.r2.dev/releases/latest-mac.yml";
const RELEASES_FALLBACK_URL =
  "https://pub-e25e5e6494664382ac6f6979fa447e85.r2.dev/releases";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(RELEASES_API_URL, {
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
