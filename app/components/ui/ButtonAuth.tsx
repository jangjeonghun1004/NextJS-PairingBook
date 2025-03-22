// app/components/auth-buttons.jsx
'use client';
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return '로그인';

  if (session) {
    return (
      // <div>
      //   <p>안녕하세요, {session.user.name}님</p>
      // </div>
      <button onClick={() => signOut()}>로그아웃</button>
    );
  }

  return <button onClick={() => signIn()}>로그인</button>;
}