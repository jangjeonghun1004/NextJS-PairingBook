'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navigation() {
    const router = useRouter();

    return (
        <nav>
            <Link href="/">홈</Link>&nbsp;&nbsp;&nbsp;
            <Link href="/blog/new-post">블로그</Link>&nbsp;&nbsp;&nbsp;
            <button onClick={() => router.push('/blog/new-page')}>블로그로 이동</button>
            <p>sdfsf</p>
        </nav>
    );
}