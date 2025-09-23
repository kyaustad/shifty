import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If the path is under /guarded it is protected

  const isGuarded = request.nextUrl.pathname.startsWith("/guarded");

  if (isGuarded && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname === "/" && session) {
    return NextResponse.redirect(new URL("/guarded/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/guarded/:path*", "/"], // Apply middleware to specific routes
};
