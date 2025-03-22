"use server";

/**
 * 로그인 API 응답 타입 정의
 */
interface LoginResponse {
  result: boolean;
  message: string;
  contents: { token: string };
}

/**
 * 사용자 로그인 요청을 처리하는 함수
 *
 * @param {string} email - 사용자의 이메일
 * @param {string} password - 사용자의 비밀번호
 * @returns {Promise<LoginResponse>} 로그인 응답 데이터 (토큰 포함)
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {


    // api 호출 방식
    const response = await fetch("http://localhost:8080/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();
    if (!data.result) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    let message = "로그인 요청 중 문제가 발생했습니다.";
    message = error instanceof Error ? error.message : message;
    throw new Error(message);
  }
}
