import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (config.matcher.includes(request.nextUrl.pathname) && !accessToken) {
    request.cookies.delete("accessToken");
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.cookies.delete("accessToken");

    return response;
  }
}

export const config = {
  matcher: ["/question"],
};
