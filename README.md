# 사유의 연못

Next.js + TypeScript + Supabase + React Flow 기반의 사유형 질문 기록 서비스 초안이다.

## 실행

```bash
npm install
npm run dev
```

## 환경 변수

`.env.local`에 아래 값을 넣는다.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

값이 없으면 앱은 데모 모드로 열리고, 목업 데이터만 읽힌다.

## 포함한 것

- `/`, `/login`, `/questions`, `/questions/new`, `/questions/[id]`, `/questions/[id]/edit`, `/me`
- 어두운 호수/촛불 계열 UI 토큰
- React Flow 기반 구조형 보기
- 읽기형 트리 보기
- Supabase Auth / CRUD용 서버 액션 골격
- `supabase/schema.sql` 데이터 모델 + RLS 초안
