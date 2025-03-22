// loading.tsx
// 이 컴포넌트는 서버 컴포넌트이므로 "use client"는 필요하지 않습니다.
import { JSX } from "react";

/**
 * Loading 컴포넌트
 * Next.js App Router에서 페이지 로딩 중에 표시되는 UI를 정의합니다.
 *
 * @returns {JSX.Element} 로딩 중에 표시할 UI
 */
export default function Loading(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">로딩 중...</p>
    </div>
  );
}
