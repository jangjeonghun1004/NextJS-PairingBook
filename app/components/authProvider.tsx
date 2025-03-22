/**
 * 세션 프로바이더 컴포넌트
 * @fileoverview 클라이언트 컴포넌트에서 세션 상태 관리
 */
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * 세션 프로바이더 props 타입
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 전역 세션 상태 제공 컴포넌트
 * @param props - 프로바이더 props
 * @returns SessionProvider로 감싼 children
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}