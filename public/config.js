/* ===================================================================
   설정 파일
   ⚠ 개인정보(이메일, 학교 도메인)와 API 키는 이 파일에 적지 않습니다.
      전부 .env (내 컴퓨터) 또는 Vercel 환경 변수에서 들어옵니다.
      이 파일은 깃허브에 올라가도 안전합니다.
   =================================================================== */

/* env.js 가 만들어 주는 값 꾸러미. 직접 고치지 마세요. */
const ENV = (typeof window !== "undefined" && window.__ENV) || {};

/* 1) 선생님 구글 계정  ← .env 의 OWNER_EMAIL */
const OWNER_EMAIL = ENV.OWNER_EMAIL || "";

/* 2) 학생 로그인을 허용할 도메인  ← .env 의 ALLOWED_DOMAIN
      빈 값이면 모든 구글 계정을 허용합니다. */
const ALLOWED_DOMAIN = ENV.ALLOWED_DOMAIN || "";

/* 3) 제미나이 API 키  ← .env 의 GEMINI_API_KEY */
const GEMINI_API_KEY = ENV.GEMINI_API_KEY || "";

/* 4) 사용할 모델 (비밀 아님) */
const GEMINI_MODEL = ENV.GEMINI_MODEL || "gemini-3.8-flash";

/* 5) 파이어베이스 설정  ← .env 의 FIREBASE_* 값들 */
const FIREBASE_CONFIG = {
  apiKey:            ENV.FIREBASE_API_KEY || "",
  authDomain:        ENV.FIREBASE_AUTH_DOMAIN || "",
  projectId:         ENV.FIREBASE_PROJECT_ID || "",
  storageBucket:     ENV.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID || "",
  appId:             ENV.FIREBASE_APP_ID || ""
};

/* ---- 아래는 비밀이 아니라 여기 그대로 둡니다 ---- */

/* 6) 학생 1인당 제출 가능 횟수 */
const MAX_SUBMISSIONS = Number(ENV.MAX_SUBMISSIONS || 3);

/* 7) 계정 아이디에서 학번을 뽑아내는 규칙 (기본: 처음 나오는 5자리 숫자) */
const HAKBEON_PATTERN = ENV.HAKBEON_PATTERN || "\\d{5}";

/* 8) 화면 맨 위에 보일 과제 이름 */
const TASK_TITLE = ENV.TASK_TITLE || "인간과 자연의 권리 발표 대본";

/* ---- 설정이 비었는지 확인해서 콘솔에 알려 줍니다 ---- */
(function () {
  const 필수 = { OWNER_EMAIL, GEMINI_API_KEY };
  const 빈것 = Object.keys(필수).filter((k) => !필수[k]);
  if (!FIREBASE_CONFIG.projectId) 빈것.push("FIREBASE_*");
  if (빈것.length) {
    console.warn("[설정 없음] 환경 변수가 비어 있습니다: " + 빈것.join(", "));
    console.warn("로컬이면 .env 파일, 배포본이면 Vercel 환경 변수를 확인하세요.");
  }
})();
