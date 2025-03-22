/**
 * HTTP 상태 코드 및 설명을 포함하는 객체
 */
type HttpStatusCode = {
  code: number;
  name: string;
  description: string;
  category: 'informational' | 'success' | 'redirection' | 'clientError' | 'serverError';
};

/**
 * 웹 개발에서 자주 사용되는 HTTP 상태 코드 및 설명
 * @type {Object.<number, HttpStatusCode>}
 */
const HttpStatusCodes: { [key: number]: HttpStatusCode } = {
    // 1xx: 정보 응답
    100: { 
      code: 100,
      name: 'Continue', 
      description: '클라이언트가 계속 요청을 이어나가도 좋다는 신호',
      category: 'informational'
    },
    101: { 
      code: 101,
      name: 'Switching Protocols', 
      description: '클라이언트의 프로토콜 전환 요청(예: WebSocket)을 서버가 승인',
      category: 'informational'
    },
  
    // 2xx: 성공 응답
    200: {
      code: 200,
      name: 'OK', 
      description: '요청이 성공적으로 처리됨',
      category: 'success'
    },
    201: { 
      code: 201,
      name: 'Created', 
      description: '요청이 성공적이며 새로운 리소스가 생성됨 (POST 요청 후 주로 사용)',
      category: 'success'
    },
    202: { 
      code: 202,
      name: 'Accepted', 
      description: '요청이 접수되었으나 아직 처리되지 않음 (비동기 작업에 사용)',
      category: 'success'
    },
    204: { 
      code: 204,
      name: 'No Content', 
      description: '요청이 성공적이나 클라이언트에게 반환할 콘텐츠가 없음 (DELETE 성공 후 주로 사용)',
      category: 'success'
    },
    206: { 
      code: 206,
      name: 'Partial Content', 
      description: '부분적 응답 (범위 요청 - Range 헤더 사용 시)',
      category: 'success'
    },
  
    // 3xx: 리다이렉션
    301: { 
      code: 301,
      name: 'Moved Permanently', 
      description: '요청한 리소스가 영구적으로 새 위치로 이동함 (모든 요청 방식 유지)',
      category: 'redirection'
    },
    302: { 
      code: 302,
      name: 'Found', 
      description: '요청한 리소스가 일시적으로 새 위치에 있음',
      category: 'redirection'
    },
    303: { 
      code: 303,
      name: 'See Other', 
      description: '다른 URL에서 요청된 리소스를 찾을 수 있음 (GET 요청으로 변환)',
      category: 'redirection'
    },
    304: { 
      code: 304,
      name: 'Not Modified', 
      description: '캐시된 버전이 수정되지 않았으므로 재사용 가능 (If-Modified-Since 헤더 사용 시)',
      category: 'redirection'
    },
    307: { 
      code: 307,
      name: 'Temporary Redirect', 
      description: '요청한 리소스가 일시적으로 다른 URI에 있음 (원래 요청 방식 유지)',
      category: 'redirection'
    },
    308: { 
      code: 308,
      name: 'Permanent Redirect', 
      description: '요청한 리소스가 영구적으로 다른 URI에 있음 (원래 요청 방식 유지)',
      category: 'redirection'
    },
  
    // 4xx: 클라이언트 오류
    400: { 
      code: 400,
      name: 'Bad Request', 
      description: '클라이언트의 요청 구문이 잘못됨 (잘못된 형식의 요청)',
      category: 'clientError'
    },
    401: { 
      code: 401,
      name: 'Unauthorized', 
      description: '인증이 필요한 리소스에 인증 없이 접근 시도',
      category: 'clientError'
    },
    403: { 
      code: 403,
      name: 'Forbidden', 
      description: '서버가 요청을 이해했지만 권한이 없어 거부함',
      category: 'clientError'
    },
    404: { 
      code: 404,
      name: 'Not Found', 
      description: '요청한 리소스를 서버에서 찾을 수 없음',
      category: 'clientError'
    },
    405: { 
      code: 405,
      name: 'Method Not Allowed', 
      description: '리소스에서 지원하지 않는 HTTP 메서드 사용',
      category: 'clientError'
    },
    406: { 
      code: 406,
      name: 'Not Acceptable', 
      description: '요청한 형식으로 응답할 수 없음 (Accept 헤더와 맞지 않음)',
      category: 'clientError'
    },
    409: { 
      code: 409,
      name: 'Conflict', 
      description: '요청이 현재 서버 상태와 충돌 (동시성 문제 등)',
      category: 'clientError'
    },
    413: { 
      code: 413,
      name: 'Payload Too Large', 
      description: '요청 엔티티가 서버가 처리할 수 있는 크기보다 큼',
      category: 'clientError'
    },
    415: { 
      code: 415,
      name: 'Unsupported Media Type', 
      description: '요청한 미디어 타입을 서버가 지원하지 않음',
      category: 'clientError'
    },
    422: { 
      code: 422,
      name: 'Unprocessable Entity', 
      description: '요청은 올바르나 의미적 오류가 있어 처리할 수 없음 (유효성 검사 실패)',
      category: 'clientError'
    },
    429: { 
      code: 429,
      name: 'Too Many Requests', 
      description: '일정 시간 내에 너무 많은 요청을 보냄 (레이트 리밋)',
      category: 'clientError'
    },
  
    // 5xx: 서버 오류
    500: { 
      code: 500,
      name: 'Internal Server Error', 
      description: '서버에 예상치 못한 오류 발생',
      category: 'serverError'
    },
    501: { 
      code: 501,
      name: 'Not Implemented', 
      description: '서버가 요청을 수행하는 기능을 지원하지 않음',
      category: 'serverError'
    },
    502: { 
      code: 502,
      name: 'Bad Gateway', 
      description: '게이트웨이나 프록시 서버가 업스트림 서버로부터 잘못된 응답을 받음',
      category: 'serverError'
    },
    503: { 
      code: 503,
      name: 'Service Unavailable', 
      description: '서버가 일시적으로 요청을 처리할 수 없음 (과부하 또는 유지보수)',
      category: 'serverError'
    },
    504: { 
      code: 504,
      name: 'Gateway Timeout', 
      description: '게이트웨이나 프록시 서버가 업스트림 서버로부터 응답을 받지 못함',
      category: 'serverError'
    }
  };
  
  /**
   * 카테고리별로 HTTP 상태 코드를 그룹화
   * @type {Object.<string, Object.<number, HttpStatusCode>>}
   */
  const HttpStatusCodesByCategory: { [key: string]: { [key: number]: HttpStatusCode } } = {
    informational: {}, // 1xx
    success: {},       // 2xx
    redirection: {},   // 3xx
    clientError: {},   // 4xx
    serverError: {}    // 5xx
  };
  
  // 카테고리별로 상태 코드 그룹화
  Object.entries(HttpStatusCodes).forEach(([code, details]) => {
    HttpStatusCodesByCategory[details.category][Number(code)] = details;
  });
  
  /**
   * HTTP 상태 코드에 대한 유틸리티 함수
   */
  const HttpStatusUtil = {
    /**
     * 상태 코드에 대한 정보 반환
     * @param {number} code - HTTP 상태 코드
     * @returns {HttpStatusCode|undefined} 상태 코드 정보 객체
     */
    getStatusInfo(code: number): HttpStatusCode {
      return HttpStatusCodes[code];
    },
  
    /**
     * 특정 카테고리의 모든 상태 코드 반환
     * @param {string} category - 카테고리 이름 ('informational', 'success', 'redirection', 'clientError', 'serverError')
     * @returns {Object.<number, HttpStatusCode>} 해당 카테고리의 상태 코드 객체
     */
    getByCategory(category: string | number) {
      return HttpStatusCodesByCategory[category] || {};
    },
  
    /**
     * 상태 코드가 성공인지 확인
     * @param {number} code - HTTP 상태 코드
     * @returns {boolean} 성공 여부
     */
    isSuccess(code: number): boolean {
      return code >= 200 && code < 300;
    },
  
    /**
     * 상태 코드가 클라이언트 오류인지 확인
     * @param {number} code - HTTP 상태 코드
     * @returns {boolean} 클라이언트 오류 여부
     */
    isClientError(code: number): boolean {
      return code >= 400 && code < 500;
    },
  
    /**
     * 상태 코드가 서버 오류인지 확인
     * @param {number} code - HTTP 상태 코드
     * @returns {boolean} 서버 오류 여부
     */
    isServerError(code: number): boolean {
      return code >= 500 && code < 600;
    }
  };
  
  export { HttpStatusCodes, HttpStatusCodesByCategory, HttpStatusUtil };