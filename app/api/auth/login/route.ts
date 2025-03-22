"use server";

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { compare } from "bcryptjs";
import { HttpStatusUtil } from "@/app/lib/httpStatusCodes";
import { Members } from "@/app/types/members";

/**
 * POST 요청 처리 - 로그인
 *
 * 클라이언트로부터 전달된 이메일과 평문 비밀번호를 기반으로,
 * MySQL 데이터베이스의 members 테이블에서 사용자를 조회한 후,
 * bcrypt.compare()를 통해 해시된 비밀번호와 입력한 비밀번호를 비교합니다.
 *
 * @param {Request} request - 클라이언트의 로그인 요청
 * @returns {Promise<NextResponse>} - 로그인 성공 또는 실패에 따른 응답 객체
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

        // 3. MySQL 데이터베이스 연결
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST!,
            port: Number(process.env.MYSQL_PORT!),
            user: process.env.MYSQL_USER!,
            password: process.env.MYSQL_PASSWORD!,
            database: process.env.MYSQL_DATABASE!,
        });

        // 4. 이메일로 회원 조회
        const [rows] = await connection.execute<Members[]>(
            "SELECT id, email, password FROM members WHERE email = ?",
            [email]
        );

        await connection.end();

        if (!Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json(
                { result: false, message: HttpStatusUtil.getStatusInfo(404).description },
                { status: 404 }
            );
        }

        const user = rows[0];

        // 5. bcrypt를 사용해 입력한 비밀번호와 DB에 저장된 해시된 비밀번호 비교
        const isValid = await compare(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { result: false, message: "이메일 또는 비밀번호가 일치하지 않습니다." },
                { status: 422 }
            );
        }

        // 6. 로그인 성공 시, 민감한 정보(예: password)는 제거 후 응답 반환
        //delete user.password;
        return NextResponse.json(
            { result: true, message: HttpStatusUtil.getStatusInfo(200).description, user }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("로그인 에러:", error);
        return NextResponse.json(
            { result: false, message: HttpStatusUtil.getStatusInfo(500).description },
            { status: 500 }
        );
    }
}
