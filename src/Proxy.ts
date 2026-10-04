import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Better Auth সেশন টোকেন কুকি থেকে রিড করা
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // সেশন না থাকলে /sign-in এ রিডাইরেক্ট করবে
  if (!sessionToken) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // সেশন ভ্যালিড থাকলে পরবর্তী পেজে যেতে দেবে
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/news/:path*"],
};