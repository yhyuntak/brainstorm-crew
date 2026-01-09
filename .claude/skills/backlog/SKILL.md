---
name: backlog
description: 프로젝트 백로그를 조회하고 관리합니다. 할 일 목록, 진행 상태, 우선순위별 필터링 지원. 백로그 보여줘, 할 일 뭐야, P1 작업, 백엔드 작업 목록, 진행 중인 거 등의 요청에 사용.
---

# Backlog Manager

---

## 백로그 위치

| 폴더 | 상태 |
|------|------|
| `docs/backlog/todo/` | 할 일 |
| `docs/backlog/in-progress/` | 진행 중 |
| `docs/backlog/done/` | 완료 |

---

## 파일명 규칙

`{priority}-{domain}-{id}-{slug}.md`

| 필드 | 값 | 예시 |
|------|-----|------|
| priority | p1, p2, p3 | `p1-` |
| domain | BE, FE | `BE-`, `FE-` |
| id | 001~999 | `001-` |
| slug | 영문 요약 | `change-rate-api` |

예: `p1-BE-001-change-rate-api.md`

---

## 조회 패턴

| 쿼리 | 액션 |
|------|------|
| "백로그 전체" | `ls docs/backlog/todo/` 후 파일 목록 표시 |
| "P1 작업" | `ls docs/backlog/todo/p1-*` |
| "P2 작업" | `ls docs/backlog/todo/p2-*` |
| "백엔드 할 일" | `ls docs/backlog/todo/*-BE-*` |
| "프론트 할 일" | `ls docs/backlog/todo/*-FE-*` |
| "진행 중인 거" | `ls docs/backlog/in-progress/` |
| "완료된 거" | `ls docs/backlog/done/` |

---

## 상태 변경

파일 이동으로 상태 변경:
```bash
# 작업 시작
mv docs/backlog/todo/p1-BE-001-xxx.md docs/backlog/in-progress/

# 작업 완료
mv docs/backlog/in-progress/p1-BE-001-xxx.md docs/backlog/done/
```

---

## 새 백로그 추가

1. 파일명 규칙에 맞게 `docs/backlog/todo/`에 파일 생성
2. 템플릿:
```markdown
# [제목]

> 한 줄 요약

## User Story
[사용자로서 ~하고 싶다]

## Acceptance Criteria
- [ ] 조건 1
- [ ] 조건 2

## Why
[왜 필요한가]

## Dependencies
- 선행 작업 있으면 기재

---
Created: YYYY-MM-DD
```

---

## How to Use This Skill

| Query | Action |
|-------|--------|
| "백로그 보여줘" | todo 폴더 파일 목록 출력 |
| "P1 작업 뭐 있어?" | p1-* 파일만 필터 |
| "백엔드 작업" | *-BE-* 파일만 필터 |
| "이슈 하나 시작할게" | todo → in-progress로 파일 이동 |
| "이거 완료했어" | in-progress → done으로 파일 이동 |
| "새 백로그 추가해줘" | 템플릿으로 새 파일 생성 |

---

**Last Updated**: 2024-12-14
