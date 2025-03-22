// -- 'members' 테이블 생성
// CREATE TABLE members (
//   id INT AUTO_INCREMENT,              -- id 컬럼: 정수형, 자동 증분 설정 (PRIMARY KEY로 사용)
//   email VARCHAR(255) NOT NULL,         -- email 컬럼: 최대 255자까지 저장, NULL 허용 안함
//   password VARCHAR(255) NOT NULL,      -- password 컬럼: 최대 255자까지 저장, NULL 허용 안함
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- created_at 컬럼: 레코드 생성 시각 자동 기록
//   PRIMARY KEY (id),                    -- id 컬럼을 기본 키로 지정
//   UNIQUE (email)                      -- email 컬럼에 유니크 제약조건 부여 (중복 값 허용하지 않음)
// ) ENGINE=InnoDB;                       -- InnoDB 스토리지 엔진 사용 (트랜잭션 지원 등)

import { RowDataPacket } from "mysql2"

export interface Members extends RowDataPacket {
    id: number,
    email: string,
    password: string,
    created_at: Date
}