import { NextResponse, type NextRequest } from "next/server"
import { proxy, config as proxyConfig } from "./proxy"

export const config = proxyConfig

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (pathname === "/" && (searchParams.has("code") || searchParams.has("error"))) {
    const redirectUrl = new URL("/auth/callback", request.url)
    redirectUrl.search = request.nextUrl.search
    return NextResponse.redirect(redirectUrl)
  }

  return proxy(request)
}
