---
paths:
  - "frontend/**/*.{ts,tsx}"
---

# Frontend Architecture

> 프론트엔드 레이어 분리 원칙 - 새 기능 구현 전 필수 숙지

---

## 프로젝트 구조

```
frontend/src/
├── pages/            # 라우트 페이지 (조립만)
├── components/       # UI 컴포넌트
│   ├── ui/              # shadcn/ui 기본 컴포넌트
│   ├── common/          # 공통 컴포넌트 (SEO, Tooltip 등)
│   ├── layout/          # 레이아웃 (Header, Footer)
│   ├── charts/          # 차트 컴포넌트
│   ├── dashboard/       # 대시보드 섹션별
│   │   ├── market/
│   │   ├── economic/
│   │   ├── sector/
│   │   ├── risk/
│   │   └── health/
│   ├── youtube/         # YouTube 관련
│   └── chatbot/         # 챗봇 관련
├── hooks/            # 커스텀 훅 (데이터 페칭)
│   ├── dashboard/       # 대시보드 데이터
│   ├── youtube/         # YouTube 데이터
│   └── briefing/        # 브리핑 데이터
├── api/              # API 클라이언트 함수
├── contexts/         # React Context (전역 상태)
├── lib/              # 유틸리티 함수
├── config/           # 설정값
├── constants/        # 상수
└── assets/           # 정적 파일
```

---

## 레이어 책임

| 레이어 | 위치 | 책임 |
|--------|------|------|
| **Page** | `pages/` | 섹션 조립, 라우팅 |
| **Component** | `components/` | UI 렌더링 |
| **Hook** | `hooks/` | 데이터 페칭, 상태 관리 |
| **API** | `api/` | 백엔드 API 호출 |

---

## 레이어 흐름

```
Page → Component → Hook → API → Backend
         ↓           ↓
    UI 렌더링   데이터/상태
```

---

## DO / DON'T

### Page (조립만!)

```tsx
// ✅ DO - 섹션 컴포넌트 조립
export function Dashboard() {
  const { getIndicatorContext } = useCrossSectionContext();

  return (
    <div>
      <MarketStructureSection getContext={getIndicatorContext} />
      <EconomicSnapshotSection getContext={getIndicatorContext} />
      <SectorHeatmapSection />
    </div>
  );
}

// ❌ DON'T - 페이지에서 직접 fetch
export function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard').then(res => res.json()).then(setData);
  }, []);

  return <div>{/* 데이터 직접 렌더링 */}</div>;
}
```

### Component (UI만!)

```tsx
// ✅ DO - props로 데이터 받기
interface Props {
  data: MarketData;
  isLoading: boolean;
}

export function MarketCard({ data, isLoading }: Props) {
  if (isLoading) return <Skeleton />;
  return <div>{data.price}</div>;
}

// ❌ DON'T - 컴포넌트에서 직접 fetch
export function MarketCard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/market').then(...);  // Hook으로 분리!
  }, []);
}
```

### Hook (데이터 페칭)

```tsx
// ✅ DO - API 함수 사용
import { fetchDashboardData } from '@/api/market';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then(setData).finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}
```

### API (백엔드 호출)

```tsx
// ✅ DO - 순수 API 함수
const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchDashboardData(): Promise<DashboardData> {
  const res = await fetch(`${API_BASE}/api/dashboard/data`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
```

---

## 새 기능 구현 체크리스트

| 작업 | 레이어 |
|------|--------|
| 새 라우트 추가 | Page |
| UI 렌더링 | Component |
| 데이터 페칭/상태 | Hook |
| 백엔드 API 호출 | API |

---

## 좋은 예시 파일

| 파일 | 설명 |
|------|------|
| `pages/Dashboard.tsx` | 섹션 조립 패턴 |
| `hooks/dashboard/useCrossSectionContext.ts` | 데이터 훅 |
| `components/dashboard/market/` | 도메인별 컴포넌트 |
| `api/market.ts` | API 클라이언트 |

---

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| 페이지에서 직접 fetch | Hook으로 분리 |
| 컴포넌트에서 API 호출 | Hook 사용 |
| Hook에서 직접 fetch URL | API 함수 사용 |
| 전역 상태 남용 | 필요한 곳만 Context |
