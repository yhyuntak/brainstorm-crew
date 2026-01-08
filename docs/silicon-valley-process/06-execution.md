# 6. 실행 단계 (Execution)

> 기획 후 실제 구현 단계

---

## 6.1 Technical Design Document (TDD) 작성

기획서는 **"무엇을"**, TDD는 **"어떻게"**

### TDD 작성 순서

| # | 단계 | 시간 | 설명 |
|---|------|------|------|
| 1 | Problem Statement | 5분 | 왜 만드는가? 한 문단 |
| 2 | Goals & Non-Goals | 10분 | 범위 명확히 |
| 3 | Architecture | 15분 | 박스 다이어그램 |
| 4 | Detailed Design | 30-60분 | 컴포넌트별 책임, 인터페이스 |
| 5 | Data Models | 15분 | TypeScript 인터페이스 |
| 6 | API Contracts | - | CLI 명령어, 설정 파일 |
| 7 | Error Handling | 10분 | 엣지 케이스, 실패 시나리오 |
| 8 | Performance | 10분 | 병목, 최적화 |
| 9 | Testing Strategy | 5분 | 단위/통합/수동 테스트 |
| 10 | Rollout Plan | - | Phase별 구현 계획 |

### TDD 작성 팁

> **"1-Pager Rule"** - 처음엔 1페이지로 시작, 필요하면 확장
>
> **"Code Speaks Louder"** - 말보다 인터페이스 코드가 명확
>
> **"Living Document"** - Git에 커밋하고 구현 중 계속 업데이트

### 피해야 할 실수
- ❌ 너무 상세하게 (코드 레벨까지)
- ❌ 너무 추상적으로 ("확장 가능한 아키텍처")
- ❌ 작성 후 방치
- ❌ 혼자 작성

---

## 6.2 Proof of Concept (PoC) 구현

전체를 만들기 전에 **가장 위험한 부분**을 먼저 검증

### PoC 대상 선정 기준
- 기술적으로 불확실한 부분
- 처음 사용하는 라이브러리/프레임워크
- 성능이 중요한 핵심 알고리즘
- 외부 API 통합 부분

### PoC 범위
```typescript
// 예: 최소한의 PoC
// - 핵심 메커니즘만
// - 1개 happy path
// - UI 없이 콘솔 출력도 OK
```

---

## 6.3 Walking Skeleton 먼저

End-to-end로 동작하는 최소 버전을 먼저 구현

**왜 중요한가?**
- CI/CD 파이프라인 검증
- 배포 프로세스 조기 확인
- 팀원 온보딩 용이
- 빠른 피드백 루프

**예시**:
```
목표: CLI 실행 → 1개 컴포넌트 → 1개 응답 → 출력
복잡한 로직 없이 전체 파이프라인만 연결
```

---

## 6.4 MVP Definition & Iteration Plan

### Phase 나누기 예시

**Phase 1 (MVP)**:
- 핵심 기능만
- 최소 동작
- 내부 테스트

**Phase 2 (Beta)**:
- 추가 기능
- UX 개선
- 외부 베타 테스터

**Phase 3 (v1.0)**:
- 배포
- 문서화
- 성능 최적화

---

## 6.5 일일/주간 루틴

### Daily Standup (15분)
- 어제 완료한 것
- 오늘 목표
- 블로커

### Weekly Demo
- 실제 동작하는 것을 보여줌
- 피드백 수집

### Retrospective (격주)
- What went well
- What to improve
- Action items

---

## 6.6 Metrics & Monitoring (초기부터)

런칭 전부터 준비

**측정 대상**:
- **Usage Metrics**: 사용 패턴
- **Performance**: 응답 시간, 리소스 사용량
- **Errors**: 실패율, 타임아웃

**도구**:
- PostHog (오픈소스 analytics)
- Sentry (에러 추적)
- 또는 간단히 로컬 로그 파일

---

## 체크리스트

### 실행 시작
- [ ] TDD 작성 완료
- [ ] PoC로 위험 검증 완료
- [ ] Walking skeleton 동작

### 매 Sprint
- [ ] Demo 가능한 상태
- [ ] 테스트 커버리지 유지
- [ ] 문서 업데이트

### 출시 전
- [ ] 성능 테스트 완료
- [ ] 에러 핸들링 검토
- [ ] 모니터링 대시보드 준비

---

[← 이전: 기획 단계](05-planning.md) | [목차](README.md) | [다음: 핵심 원칙 →](07-principles.md)
