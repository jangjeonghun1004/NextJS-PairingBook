/**
 * NextAuth 미들웨어
 * @fileoverview 보호된 경로에 접근 제어를 위한 미들웨어
 */
import { auth } from "@/nextAuthConfig";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 미들웨어 함수 - 인증 상태에 따라 경로 접근 제어
 * @param request - Next.js 요청 객체
 * @returns NextResponse 또는 undefined
 */
export async function middleware(request: NextRequest) {
  const session = await auth();

  // 로그인하지 않은 사용자가 보호된 경로에 접근하는 경우
  if (!session && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 경로 패턴 설정
 */
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
};