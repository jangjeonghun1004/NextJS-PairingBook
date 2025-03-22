/**
 * NextAuth 설정 파일
 * @fileoverview NextAuth 인증 옵션과 핸들러를 설정
 */
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { Members } from "./app/types/members";
import { User } from "next-auth";

/**
 * NextAuth 설정 객체
 */
export const nextAuthConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      // Credentials Provider 설정
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      /**
       * 사용자 인증 함수
       * @param credentials - 사용자가 입력한 인증 정보
       * @returns 인증된 사용자 객체 또는 null
       */
      async authorize(credentials):Promise<User | null> {
        // 여기서 DB 조회 또는 API 호출로 사용자 검증

        // 1) 값 검증
        if (!credentials?.email || !credentials?.password) {
          // 로그인 실패 시 null 반환
          return null;
        }

        // 오류 메시지 "The edge runtime does not support Node.js 'stream' module"은 Edge 런타임 환경에서 Node.js 전용 모듈을 사용하려 해서 발생합니다.
        // 해당 오류를 해결하기 위해 "import mysql from "mysql2/promise";" 대신 동적으로 모듈을 로드 합니다.
        // 동적으로 mysql2/promise 모듈 로드
        const mysqlModule = await import("mysql2/promise");

        // 2) DB 연결 및 사용자 조회
        const connection = await mysqlModule.createConnection({
          host: process.env.MYSQL_HOST!,
          port: Number(process.env.MYSQL_PORT!),
          user: process.env.MYSQL_USER!,
          password: process.env.MYSQL_PASSWORD!,
          database: process.env.MYSQL_DATABASE!,
        });

        const [rows] = await connection.execute<Members[]>(
          "SELECT id, email, password FROM members WHERE email = ?",
          [credentials.email]
        );
        await connection.end();

        if (!Array.isArray(rows) || rows.length === 0) {
          // 사용자 없음 → null 반환
          return null;
        }

        const userRecord = rows[0];

        // 3) 비밀번호 비교
        const isValid = await compare(String(credentials.password), userRecord.password);
        if (!isValid) {
          // 비밀번호 불일치 → null 반환
          return null;
        }

        // 4) 로그인 성공 시, 민감 정보 제거 후 유저 객체 반환
        return {
          id: String(userRecord.id),  // 기본 필드
          name: 'nickname',           // 기본 필드
          email: userRecord.email,    // 기본 필드
          image: 'image_url',         // 기본 필드
          role: 'test-role',          // 사용자 추가 필드
        };
      }
    }),
    // 다른 프로바이더 추가
  ],
  callbacks: {
    /**
     * JWT 생성 시 실행되는 콜백
     * @param params - JWT 콜백 파라미터
     * @returns 수정된 토큰
     */
    async jwt({ token, user }) {
      if (user) {
        // 필요한 경우 추가 사용자 데이터 포함
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    /**
     * 클라이언트에 세션 반환 시 실행되는 콜백
     * @param params - 세션 콜백 파라미터
     * @returns 클라이언트에 노출할 세션 객체
     */
    async session({ session, token }) {
      if (session.user) {
        // 필요한 경우 추가 사용자 데이터 포함
        session.user.id = token.id ? token.id : '';
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',  // 보호된 페이지에 접근할 때, 로그인 실패 시 에러 처리, 직접 signIn 함수 호출 시
    // 필요에 따라 다른 커스텀 페이지 추가
  },
  session: {
    strategy: "jwt",  // JWT 전략 사용
  },
};

/**
 * NextAuth 핸들러와 auth() 함수
 */
export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig);