import { NextRequest, NextResponse } from "next/server"
import {EnumTokens} from "@/services/auth-token.service";

export async function middleware(req: NextRequest) {
  const { url, cookies } = req

  const authToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  const isDashboard = url.includes("/dashboard")
  const isProfile = url.includes("/profile")
  const isAuthPage = url.includes("/auth")

  console.log(url);

  if (isDashboard && !authToken || isProfile && !authToken) {
    return NextResponse.redirect(new URL("/auth", url))
  }

  if (!isDashboard && !isAuthPage && !isProfile || isAuthPage && authToken) {
    return NextResponse.redirect(new URL("/dashboard/users", url))
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/dashboard/:path*', '/', '/auth', '/profile']
}
