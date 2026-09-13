#!/usr/bin/env node
/* ===================================================================
   빌드 스크립트
   환경 변수를 public/env.js 로 만들어 줍니다.
   찾는 순서 : Vercel 환경 변수 → 내 컴퓨터의 .env 파일
   env.js 는 .gitignore 에 들어 있어 깃허브에 절대 올라가지 않습니다.
   =================================================================== */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public", "env.js");

/* 브라우저로 내보낼 값 목록 */
const 필수키 = [
  "GEMINI_API_KEY",
  "OWNER_EMAIL",
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID"
];
const 선택키 = [
  "ALLOWED_DOMAIN",
  "GEMINI_MODEL",
  "MAX_SUBMISSIONS",
  "HAKBEON_PATTERN",
  "TASK_TITLE"
];

/* 1) 로컬 .env 읽기 (있으면) */
function readDotEnv() {
  const p = path.join(root, ".env");
  if (!fs.existsSync(p)) return {};
  const env = {};
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

const dotenv = readDotEnv();
const pick = (k) => process.env[k] || dotenv[k] || "";

const values = {};
for (const k of [...필수키, ...선택키]) {
  const v = pick(k);
  if (v) values[k] = v;
}

const 빠진것 = 필수키.filter((k) => !values[k]);
if (빠진것.length) {
  console.warn("\n⚠  환경 변수를 찾지 못했습니다: " + 빠진것.join(", "));
  console.warn("   로컬이면 .env 파일에, Vercel 이면 프로젝트 환경 변수에 넣어 주세요.");
  console.warn("   지금은 빈 값으로 만듭니다. 화면은 열리지만 로그인·채점이 되지 않습니다.\n");
}

fs.writeFileSync(
  out,
  "/* 빌드할 때 자동으로 만들어지는 파일입니다. 직접 고치지 마세요. */\n" +
    "/* 이 파일은 .gitignore 에 있어 깃허브에 올라가지 않습니다. */\n" +
    "window.__ENV = " + JSON.stringify(values, null, 2) + ";\n",
  "utf8"
);

const 있는것 = Object.keys(values).length;
console.log(`✓ public/env.js 생성 완료 (값 ${있는것}개, 빠진 필수값 ${빠진것.length}개)`);
