---
name: code-review
description: 코드 변경사항을 리뷰합니다. 커밋 전 체크, PR 리뷰, 코드 리뷰 요청, 변경사항 검토 등에 사용. git diff/status 기반으로 변경사항 분석 후 프로젝트 패턴 준수 여부 확인.
---

# Code Review

> 변경된 코드를 프로젝트 패턴과 범용 품질 기준으로 리뷰

---

## Review Process

### Step 1: 변경사항 파악

```bash
# 스테이징된 변경사항
git diff --cached --name-only

# 전체 변경사항
git status --porcelain

# 상세 diff
git diff --cached
```

### Step 2: 프로젝트 Rules 참조

> `.claude/rules/` 에 있는 프로젝트별 패턴/아키텍처 문서를 확인

**백엔드**:
- [backend-architecture.md](../../../.claude/rules/backend-architecture.md) - 레이어 분리 원칙
- [backend-patterns.md](../../../.claude/rules/backend-patterns.md) - Provider, Service, Exception 패턴

**프론트엔드**:
- [frontend-architecture.md](../../../.claude/rules/frontend-architecture.md) - Page → Component → Hook → API
- [frontend-patterns.md](../../../.claude/rules/frontend-patterns.md) - 색상 체계, shadcn/ui

### Step 3: 범용 품질 기준 체크

---

## Code Smells (Universal Red Flags)

### Function-Level
| Smell | Threshold | 문제점 |
|-------|-----------|--------|
| Long Function | >50 lines | 복잡도 증가 |
| Too Many Parameters | >3-4개 | 커플링 |
| Deep Nesting | >3 levels | 인지 부하 |
| Magic Numbers | 상수 미추출 | 의도 불명확 |
| Boolean Flags | bool로 동작 변경 | 책임 분리 필요 |

### Class/Module-Level
| Smell | Threshold | 문제점 |
|-------|-----------|--------|
| God Object | >500 lines | 단일 책임 위반 |
| Feature Envy | 다른 클래스 데이터 과다 사용 | 책임 위치 오류 |
| Shotgun Surgery | 1개 변경 → 다수 파일 수정 | 응집도 부족 |

### Code-Level
| Smell | 설명 | 해결 |
|-------|------|------|
| Duplicate Code | 동일 로직 2+ 곳 | DRY 원칙 |
| Dead Code | 미사용 함수/변수/import | 삭제 |
| Inconsistent Naming | 유사한 것 다르게 명명 | 통일 |

---

## Structural Issues

### Architecture Red Flags
- **Circular Dependencies**: A imports B, B imports A
- **Missing Abstractions**: 구체 구현만 존재
- **Tight Coupling**: A 변경 시 B도 변경 필요

### Organization Issues
- **No Clear Boundaries**: 모든 것이 모든 것에 접근
- **Mixed Concerns**: 비즈니스 + UI + 데이터 접근 혼재

---

## Review Output Format

```markdown
## Summary
- 변경 파일 수: N개
- 주요 변경 영역: [backend/frontend/both]

## Issues Found

### P0 - Must Fix (블로커)
- [file:line] 이슈 설명
  - Rule: 어떤 규칙 위반
  - Fix: 수정 방안

### P1 - Should Fix (중요)
- ...

### P2 - Consider (개선)
- ...

## Good Practices Observed
- 잘 된 점들 (긍정 피드백)

## Recommendation
- Top 3 액션 아이템
```

---

## Quick Reference

### 레이어 위반 체크 (Backend)
```
❌ Router에서 직접 DB 쿼리
❌ Router에서 비즈니스 로직
❌ Service에서 db.execute() 직접 호출
❌ Provider에서 캐싱 로직

✅ Router → Service → Repository/Provider
```

### 레이어 위반 체크 (Frontend)
```
❌ Page에서 직접 fetch
❌ Component에서 API 호출
❌ Hook에서 직접 fetch URL 작성

✅ Page → Component → Hook → API
```

---

## When to Use

| 트리거 | 설명 |
|--------|------|
| "코드 리뷰해줘" | 변경사항 전체 리뷰 |
| "커밋 전에 확인" | 스테이징된 변경사항 리뷰 |
| "PR 리뷰" | 브랜치 변경사항 리뷰 |
| "이거 괜찮아?" | 특정 코드 리뷰 |

---

**Last Updated**: 2026-01-08
