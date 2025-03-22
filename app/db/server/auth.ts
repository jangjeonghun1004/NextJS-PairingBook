'use server'
import mysql, { RowDataPacket } from 'mysql2/promise';

export async function loginMember(email: string, password: string): Promise<Array<{id: string, email: string}>> {
    // MySQL 연결 설정
    const connection = await mysql.createConnection({
        host: '127.0.0.1',  // 또는 'localhost'
        port: 3306,         // MySQL 기본 포트, 필요 시 명시
        user: 'root',
        password: 'r00t',
        database: 'pairing_book',
    });

    try {
        // 쿼리 실행: id와 email만 선택
        const [rows] = await connection.execute(`SELECT id, email FROM members where email="${email}" and password="${password}"`);
        return (rows as RowDataPacket[]).map(row => ({
            id: row.id,
            email: row.email
        }));  // [{ id: 1, email: 'example@mail.com' }, ...] 형식으로 반환
    } catch (error) {
        console.error('Database query failed:', error);
        return [];
    } finally {
        // 연결 종료
        await connection.end();
    }
}