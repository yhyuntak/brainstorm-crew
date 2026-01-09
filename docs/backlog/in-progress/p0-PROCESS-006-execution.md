# P0-PROCESS-006: Execution (실행)

> 실리콘 밸리 프로세스 6단계

**상태**: 대기
**시작일**: -

---

## 체크리스트

### 6.1 PoC (Proof of Concept)
- [ ] 가장 위험한 부분 식별: 손들기 메커니즘 + LLM 호출
- [ ] 최소 PoC 구현
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
