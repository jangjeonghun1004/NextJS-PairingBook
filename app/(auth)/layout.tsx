
/**
 * 인증 관련 페이지들을 위한 레이아웃 컴포넌트
 * 로그인, 회원가입 등의 페이지에서 공통으로 사용됨
 *
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 레이아웃 내부에 렌더링될 자식 컴포넌트
 * @returns {React.ReactElement} 인증 페이지 레이아웃
 */
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
