"use client";
import { useState, JSX } from "react";
import ButtonSubmit from "@/app/components/ui/ButtonSubmit";
import { signIn } from "next-auth/react";
import Link from "next/link";

/**
 * 로그인 페이지 컴포넌트
 *
 * @returns {JSX.Element} 로그인 폼 UI
 */
export default function LoginPage(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      const email = formData.get('email') as string | null;
      const password = formData.get('password') as string | null;

      if (!email || !password) {
        throw new Error("이메일과 비밀번호를 입력해주세요.");
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,    // false로 설정 → 클라이언트에서 결과 확인 가능
        callbackUrl: "/",   // 성공 시 이동할 경로
      });

      // result는 { error?: string, status?: number, ok: boolean, url?: string } 형태
      if (signInResult?.error) {
        // 로그인 실패 → 에러 메시지 설정
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        // 로그인 성공 → 원하는 페이지로 이동 (또는 result.url)
        window.location.href = signInResult?.url || "/";
      }

      //const data = await loginUser(email, password);
      //setToken(data.contents.token); // 토큰 저장
      //localStorage.setItem("authToken", data.contents.token); // 토큰 저장
      //setError(null);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "로그인 중 문제가 발생했습니다.");
      setToken('');
    }
  };

  return (
    <>
      <section className="contact section" style={{ padding: '0px' }}>
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
          <div className="row w-100">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">

              <form action={handleSubmit} className="php-email-form p-3">
                <div className="col-md-12 text-center container-center">
                  <img src="/assets/img/logo.svg" className="logo-login" />
                  <h1>로그인</h1><br />
                </div>

                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder="Email" />
                </div>

                <div className="mb-3">
                  <p style={{ textAlign: 'right', fontSize: '12px', marginBottom: '3px' }}>
                    Forgot your password? <Link href="/forgot-password">Reset password</Link>
                  </p>
                  <input type="password" className="form-control" name="password" placeholder="Password" />
                </div>

                <div className="text-center mt-4">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {token && <div className="alert alert-success">로그인 성공 및 JWT 토큰이 설정되었습니다.</div>}

                  <ButtonSubmit text="로그인" />
                </div>

                <div className="text-center mt-3">
                  <p>Don`&apos;`t have an account? <Link href="/signup">Sign up</Link></p>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}