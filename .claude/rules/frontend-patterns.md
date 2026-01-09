---
paths:
  - "frontend/**/*.{ts,tsx,css}"
---

# Frontend Patterns

> 프론트엔드 구현 시 따라야 할 패턴
> 상세 문서: [docs/design-system.md](../../docs/design-system.md)

---

## 핵심 원칙

- **5초 안에 파악**: 금융 대시보드는 5초 안에 전체 상황 파악 가능해야 함
- **의미 기반 색상**: 숫자 방향(↑↓)이 아닌 **경제적 의미**를 따름

---

## 색상 체계

| 용도 | 클래스 | 적용 예시 |
|------|--------|----------|
| 긍정 | `text-bullish-500` | GDP↑, 실업률↓, CPI↓ |
| 부정 | `text-bearish-500` | GDP↓, 실업률↑, CPI↑ |
| 중립 | `text-neutral-500` | 변화 없음 |

---

## 필수 클래스

```tsx
// 숫자는 반드시 font-numeric 사용
<span className="font-numeric">2.8%</span>
<span className="text-price">$1,234.56</span>

// 색상 + 아이콘 + 기호 함께 사용 (접근성)
<span className="text-bullish-500">▲ +2.8%</span>

// 카드 스타일
<div className="card">...</div>

// 로딩 스켈레톤
<div className="skeleton h-8 w-24"></div>
```

---

## 컴포넌트 작성 체크리스트

- [ ] 숫자에 `font-numeric` 적용
- [ ] 상승/하락 색상이 "의미"를 따르는지 확인
- [ ] 색상 + 아이콘(▲▼) + 기호(+/-) 함께 사용
- [ ] 로딩 상태에 `.skeleton` 유틸리티 클래스 사용

---

## shadcn/ui 컴포넌트

> 새로운 UI 구현 시 shadcn/ui 컴포넌트를 우선 사용

**설치된 컴포넌트**:
```
frontend/src/components/ui/
├── button.tsx      # 버튼
├── dialog.tsx      # 모달/다이얼로그
├── tooltip.tsx     # 툴팁
├── collapsible.tsx # 접기/펼치기
└── tabs.tsx        # 탭 네비게이션
```

**사용 가이드라인**:
- **Button**: 모든 버튼에 사용 (직접 `<button>` 스타일링 금지)
- **Dialog**: 모달 창 (BaseModal에서 래핑하여 사용)
- **Tooltip**: 툴팁 (common/Tooltip.tsx에서 래핑)
- **Card**: shadcn Card 대신 `.card` 유틸리티 클래스 사용
- **로딩 상태**: `.skeleton` 유틸리티 클래스 사용

**추가 컴포넌트 필요 시**:
```bash
cd frontend
pnpm dlx shadcn@latest add [component-name]
```

---

## 기존 디자인 시스템과의 관계

- shadcn/ui 컴포넌트 + 기존 색상 체계 (`bullish/bearish/neutral`) 함께 사용
- 금융 특화 스타일은 기존 유틸리티 클래스 유지
- 예: `<div className="card border-bullish-500/20">`
