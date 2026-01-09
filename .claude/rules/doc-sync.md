# 문서 동기화 규칙

> 코드 변경 시 관련 문서도 함께 업데이트

---

## 변경 → 문서 매핑

| 변경 영역 | 업데이트할 문서 |
|----------|----------------|
| 백엔드 레이어 구조 | `.claude/rules/backend-architecture.md` |
| 백엔드 패턴 (예외, API, Provider) | `.claude/rules/backend-patterns.md` |
| 프론트엔드 UI/컴포넌트 | `.claude/rules/frontend-patterns.md` |
| 개발환경 (uv, alembic) | `.claude/rules/dev-environment.md` |
| 데이터 흐름/아키텍처 | `docs/architecture/004-data-flow.md` |
| 새 API 엔드포인트 | `docs/architecture/` |

---

## 자동 체크 트리거

다음 상황에서 문서 동기화 필요 여부를 확인:

1. **새 패턴 도입** → patterns.md 업데이트
2. **레이어 구조 변경** → architecture.md 업데이트
3. **새 유틸리티 함수** → 해당 문서에 추가
4. **환경 설정 변경** → dev-environment.md 업데이트

---

## 체크리스트

코드 작업 완료 후:
- [ ] 새로운 패턴이 있으면 문서화했나?
- [ ] 기존 패턴을 변경했으면 문서 업데이트했나?
- [ ] 새 API/컴포넌트가 있으면 아키텍처 문서 반영했나?

---

**Last Updated**: 2026-01-09
