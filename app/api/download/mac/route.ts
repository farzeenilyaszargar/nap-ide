import { NextResponse } from "next/server";

const RELEASES_API_URL =
  "https://api.github.com/repos/aaravbangsmetal/xMetallic/releases/latest";
const RELEASES_FALLBACK_URL =
  "https://github.com/aaravbangsmetal/xMetallic/releases/latest";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(RELEASES_API_URL, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.redirect(RELEASES_FALLBACK_URL, { status: 302 });
    }

    const release = (await response.json()) as {
      assets?: Array<{ name?: string; browser_download_url?: string }>;
    };

    // Prefer DMG for mac install UX, fall back to mac zip asset.
    const dmgAsset = release.assets?.find((item) => {
      const name = item.name?.toLowerCase() ?? "";
      return name.endsWith(".dmg");
    });
    const zipAsset = release.assets?.find((item) => {
      const name = item.name?.toLowerCase() ?? "";
      return name.endsWith("-arm64-mac.zip") || name.endsWith("-mac.zip");
    });

    const target =
      dmgAsset?.browser_download_url ||
      zipAsset?.browser_download_url ||
      RELEASES_FALLBACK_URL;

    return NextResponse.redirect(target, { status: 302 });
  } catch {
    return NextResponse.redirect(RELEASES_FALLBACK_URL, { status: 302 });
  }
}
