# Project Setup Command

> 새 프로젝트에 `.claude/` 복사 후 실행하여 프로젝트에 맞게 설정

---

## 실행 조건

User types: `/project-setup`

---

## 프로세스

### Step 1: 프로젝트 정보 수집

사용자에게 질문:

```
새 프로젝트 설정을 시작합니다.

다음 정보를 알려주세요:
1. 프로젝트 이름
2. 한 줄 설명
3. 기술 스택 (예: Python/FastAPI, React/TypeScript)
4. 특이사항 (선택)
```

### Step 2: 파일 분석 및 업데이트 계획

PROJECT_SETUP_GUIDE.md를 참조하여 업데이트 필요한 파일 목록 제시:

```markdown
## 업데이트 필요 파일

### 필수 수정
- [ ] CLAUDE.md - 프로젝트 정보 전체
- [ ] .claude/rules/dev-environment.md - 환경 설정

### 기술 스택에 따라
- [ ] backend-*.md - 백엔드 있으면 재작성
- [ ] frontend-*.md - 프론트엔드 있으면 재작성

### 삭제 후보
- [ ] skills/api-reference/ - 외부 API 없으면
- [ ] skills/shadcn-ui/ - shadcn 안 쓰면
```

### Step 3: 사용자 확인

```
위 계획대로 진행할까요?
- 수정할 파일 확인
- 삭제할 파일 확인
```

### Step 4: 파일 업데이트 실행

승인 후:

**1. docs/ 구조 생성**
```bash
mkdir -p docs/adr docs/backlog/{todo,in-progress,done} docs/architecture
```

**2. docs/adr/README.md 생성**
```markdown
# Architecture Decision Records

| # | 제목 | 날짜 | 상태 |
|---|------|------|------|
| - | - | - | - |

---

**Last Updated**: {today}
```

**3. docs/backlog/README.md 생성**
```markdown
# Backlog

> 프로젝트 백로그 관리

## 현황

| 상태 | 개수 |
|------|------|
| Todo | 0 |
| In Progress | 0 |
| Done | 0 |

---

**Last Updated**: {today}
```

**4. CLAUDE.md 업데이트**

**5. 불필요한 rules/skills 삭제**

**6. 필요한 rules 템플릿 생성**

**7. doc-sync.md 매핑 테이블 업데이트**

### Step 5: 완료 보고

```markdown
## 설정 완료

### 생성된 구조
docs/
├── adr/
│   └── README.md
├── backlog/
│   ├── todo/
│   ├── in-progress/
│   ├── done/
│   └── README.md
└── architecture/

### 업데이트된 파일
- CLAUDE.md
- .claude/rules/dev-environment.md
- ...

### 삭제된 파일
- .claude/skills/api-reference/
- ...

### 다음 단계
1. CLAUDE.md 내용 검토
2. 필요시 rules/ 추가 작성
3. 개발 시작!
```

---

## 파일별 처리 가이드

### CLAUDE.md

**템플릿**:
```markdown
# {프로젝트명}

> {한 줄 설명}

---

## 기술 스택

| Layer | Stack |
|-------|-------|
| Backend | {backend_stack} |
| Frontend | {frontend_stack} |

---

## 핵심 원칙

- (프로젝트 특성에 맞게 추가)

---

**Last Updated**: {today}
```

### dev-environment.md

기술 스택에 따라:
- Python → uv, pytest 섹션
- Node.js → pnpm, jest 섹션
- Go → go mod 섹션

### doc-sync.md

매핑 테이블을 실제 존재하는 파일로 업데이트

---

## 범용 파일 (수정 불필요)

이 파일들은 그대로 유지:
- `.claude/rules/adr.md`
- `.claude/rules/git-workflow.md` (브랜치 전략만 확인)
- `.claude/rules/backlog.md`
- `.claude/commands/refactor-check.md`
- `.claude/skills/code-review/`

---

**Last Updated**: 2026-01-09
