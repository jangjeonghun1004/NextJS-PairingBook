/**
 * NextAuth 타입 확장
 * @fileoverview Session과 User 타입을 확장
 */
import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | null;
  }
}

declare module "next-auth" {
  /**
   * Session에 추가할 사용자 정의 속성
   */
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null

      // 추가 필요한 사용자 속성
      role?: string | null;
    }
  }

  /**
   * User에 추가할 사용자 정의 속성
   */
  interface User {
    // 추가 필요한 사용자 속성
    role?: string | null;
  }
}