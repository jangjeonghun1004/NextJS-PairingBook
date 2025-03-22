"use server";

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { hash } from "bcryptjs";
import { HttpStatusUtil } from "@/app/lib/httpStatusCodes";

/**
 * POST 요청 핸들러
 * 평문 비밀번호를 bcrypt로 해시한 후 MySQL의 members 테이블에 저장합니다.
 *
 * 단계:
 * 1. 클라이언트로부터 JSON 데이터(예: email, password, name)를 파싱합니다.
 * 2. 필수 값(email, password)이 제공되었는지 검증합니다.
 * 3. bcrypt를 사용하여 비밀번호를 해시합니다.
 * 4. MySQL 데이터베이스에 연결합니다.
 * 5. members 테이블에 해시된 비밀번호와 기타 데이터를 삽입합니다.
 * 6. 연결을 종료하고 성공 응답을 반환합니다.
 *
 * @param {Request} request - 클라이언트의 요청 객체
 * @returns {Promise<NextResponse>} - 성공 또는 에러 응답 객체
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. 요청 JSON 파싱
    const { email, password } = await request.json();

    // 2. 필수 값 검증
    if (!email || !password) {
      return NextResponse.json(
        { result: false, message: HttpStatusUtil.getStatusInfo(422).description },
        { status: 422 }
      );
    }

    // 3. bcrypt를 사용한 비밀번호 해싱 (saltRounds: 10)
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // 4. MySQL 데이터베이스 연결
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST!,
      port: Number(process.env.MYSQL_PORT!),
      user: process.env.MYSQL_USER!,
      password: process.env.MYSQL_PASSWORD!,
      database: process.env.MYSQL_DATABASE!,
    });

    // 5. members 테이블에 데이터 삽입 (예: email, hashed password)
    const query = "INSERT INTO members (email, password) VALUES (?, ?)";
    await connection.execute(query, [email, hashedPassword]);

    // 6. 연결 종료 후 성공 응답 반환
    await connection.end();
    return NextResponse.json(
      { result: true, message: "회원가입이 성공적으로 처리되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("회원가입 에러:", error);
    return NextResponse.json(
      { result: false, message: "서버 내부 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
