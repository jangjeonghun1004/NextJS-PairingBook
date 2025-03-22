/**
 * 프로필 페이지 컴포넌트
 * @fileoverview 서버 컴포넌트에서 세션 정보 사용
 */
import { auth } from "@/nextAuthConfig";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return <div>로그인이 필요합니다</div>;
  }

  return (
    <div>
      <h1>프로필</h1>
      <p>이름: {session.user.name}</p>
      <p>이메일: {session.user.email}</p>
      <p>이미지: {session.user.image}</p>

      <p>사용자 ID: {session.user.id}</p>
      <p>role: {session.user.role}</p>
    </div>
  );
}