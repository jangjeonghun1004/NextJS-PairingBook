'use client'
import ButtonSubmit from "@/app/components/ui/ButtonSubmit";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData): Promise<void> => {
        try {
            const email = formData.get("email") as string || null;
            const password = formData.get("password") as string || null;

            if (!email || !password) {
                throw new Error("이메일과 비밀번호를 입력해주세요.");
            }

            // route api 호출 방식
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data: { result: boolean, message: string } = await response.json();
            if (data.result) {
                setSuccess(data.message);
                setError(null);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.warn(error);
            setError(error instanceof Error ? error.message : '회원 가입 중 문제가 발생했습니다.');
            setSuccess(null);
        }
    };

    return (
        <section className="contact section" style={{ padding: '0px' }}>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-4">
                    <div className="php-email-form">

                        <div className="col-md-12 text-center container-center">
                            <img src="/assets/img/logo.svg" className="logo-login" />
                            <h1>회원 가입</h1><br />
                        </div>

                        <form action={handleSubmit} className="row gy-4">
                            <div className="col-md-12">
                                <input type="email" className="form-control" name="email" placeholder="Email" />
                            </div>

                            <div className="col-md-12">
                                <input type="password" className="form-control" name="password" placeholder="Password" />
                            </div>

                            <div className="col-md-12 text-center">
                                {error && <div className="error-message">{error}</div>}
                                {success && <div className="sent-message">회원 가입 성공</div>}

                                {success && <Link href={'/'}>홈 화면으로 이동</Link>}
                                {!success && <ButtonSubmit text="회원 가입" />}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
}