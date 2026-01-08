# 개발 워크플로우

> Git 커밋 규칙 + 백로그 관리

---

## Git 워크플로우

**현재 전략**: `main` 브랜치에 직접 작업 및 푸시

```bash
# 작업 후 커밋 & 푸시
git add .
git commit -m "feat: 새 기능 구현"
git push origin main
```

---

## 커밋 메시지 규칙

```
<type>: <description>

# 타입
feat:     새 기능
fix:      버그 수정
refactor: 리팩토링
docs:     문서 변경
chore:    기타 (의존성, 설정 등)
```

---

## 백로그 관리

### 폴더 구조

```
docs/backlog/
├── README.md        # 전체 현황
├── todo/            # 할 일
├── in-progress/     # 진행 중
└── done/            # 완료
```

### 파일명 규칙

```
{priority}-{domain}-{id}-{slug}.md
```

예: `p1-BE-001-change-rate-api.md`

### 우선순위

| 우선순위 | 의미 |
|---------|------|
| P0 | 외부 공개 준비 (필수) |
| P1 | 최우선 |
| P2 | 중요 |

---

## 작업 플로우

### 1. 백로그 선택

```
docs/backlog/README.md → todo/ 폴더에서 작업할 항목 선택
```

### 2. 백로그 상태 변경 (todo → in-progress)

> **트리거 신호**: "진행한다", "시작하자", "이거 할게" 등

**필수 작업**:

```bash
# 1. 파일 이동
mv docs/backlog/todo/p1-BE-001-*.md docs/backlog/in-progress/

# 2. README.md 업데이트
# - 해당 항목에 🔄 이모지 추가
# - 링크 경로를 in-progress/로 변경
# - 현황 테이블 개수 갱신
```

### 3. 구현

- TodoWrite로 작업 목록 생성
- 스텝별 구현

### 4. 커밋 & 푸시

```bash
git add .
git commit -m "feat: 변화율 API 구현"
git push origin main
```

### 5. 백로그 완료 (in-progress → done)

**필수 작업**:

```bash
# 1. 파일 이동
mv docs/backlog/in-progress/p1-BE-001-*.md docs/backlog/done/

# 2. README.md 업데이트
# - 해당 항목에 ✅ 이모지로 변경
# - 링크 경로를 done/로 변경
# - 현황 테이블 개수 갱신
# - Last Updated 날짜 갱신
```
