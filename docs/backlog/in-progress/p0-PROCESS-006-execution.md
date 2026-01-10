# P0-PROCESS-006: Execution (실행)

> 실리콘 밸리 프로세스 6단계

**상태**: 진행 중
**시작일**: 2026-01-09

---

## 체크리스트

### 6.1 PoC (Proof of Concept)

#### 손들기 메커니즘 설계 (완료)
- [x] 가장 위험한 부분 식별: 손들기 메커니즘 + LLM 호출
- [x] 핵심 설계 결정:
  - **병렬 처리**: 모든 에이전트에게 동시에 관심도 점수 요청 (사용자 경험 우선)
  - **두 가지 모드**: 손들기 모드 / 토론 모드
  - **동적 프롬프트 생성**: Agent MD 파일은 순수 역할만, 런타임에 모드별 시스템 프롬프트 조합
  - **LLM 선택**: xAI Grok (grok-4-1-fast-reasoning) - 저렴한 비용 ($0.20/1M 입력)

#### 손들기 메커니즘 상세
```
1. 관심도 점수 요청 (병렬):
   - 각 에이전트에게 0-100 점수 요청
   - 시스템 프롬프트 = Agent 역할 + META INSTRUCTION
   - 메시지 히스토리: 자신의 발언은 assistant, 다른 발언은 user
   - max_tokens=5, temperature=0

2. 발언자 선택:
   - 사회자 80+ → 사회자 우선
   - 이전 발언자 제외
   - 최고 점수 선택
   - 전원 20 이하 → 사회자 정리

3. 발언 생성:
   - 시스템 프롬프트 = Agent 역할 + DEBATE RULES
   - 자유로운 발언 생성
```

#### Agent MD 파일 구조
```markdown
# Devil's Advocate

## Role
아이디어의 약점을 찾고 비판적 관점에서 질문하는 역할

## Personality
- 날카롭지만 건설적
- 반박할 때 근거 제시

## Interest Criteria
- 논리적 허점 보일 때: 높은 관심
- 기술적 실현 가능성 의문: 높은 관심
- 이미 검증된 주제: 낮은 관심
```

#### PoC 구현 계획
- [ ] Mock 데이터로 발언자 선택 로직 구현
- [ ] 메시지 히스토리 변환 로직 (에이전트별 user/assistant 분리)
- [ ] 동적 시스템 프롬프트 생성 (손들기/토론 모드)
- [ ] 실제 LLM API 연동 (xAI Grok)
- [ ] 3개 에이전트로 간단한 토론 시뮬레이션
- [ ] 검증 완료

### 6.2 Walking Skeleton
- [ ] End-to-end 최소 버전
- [ ] CLI 실행 → 1개 에이전트 → 1개 응답 → 출력

### 6.3 MVP 구현

#### Phase 1: Foundation
- [ ] 프로젝트 셋업 (Bun + TypeScript + Ink)
- [ ] 폴더 구조 생성 (~/.brainstorm-crew/)
- [ ] Config 로딩/저장
- [ ] LLM Provider (OpenAI)
- [ ] Agent 로딩 (md 파일)

#### Phase 2: Core
- [ ] Debate Engine (손들기 메커니즘)
- [ ] 기본 CLI UI (Ink)
- [ ] 세션 저장/불러오기
- [ ] 기본 에이전트 3개 (Facilitator, Devil, Tech)

#### Phase 3: Polish
- [ ] Anthropic Provider 추가
- [ ] 스트리밍 응답
- [ ] 에러 핸들링
- [ ] CLI 명령어 완성
- [ ] README 작성

### 6.4 일일/주간 루틴
- [ ] 동작하는 데모 유지
- [ ] 주기적 피드백 수집

---

## 참고

- [06-execution.md](../../silicon-valley-process/06-execution.md)
- [TECHNICAL_DESIGN.md](../../TECHNICAL_DESIGN.md) - Rollout Plan
