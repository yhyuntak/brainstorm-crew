# Git 워크플로우

> Git 브랜치 전략 및 커밋 규칙

---

## 브랜치 전략

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

### 예시

```bash
feat: 변화율 API 구현
fix: 캐시 만료 시간 오류 수정
refactor: YouTubeService 책임 분리
docs: API 문서 업데이트
chore: 의존성 업데이트
```

---

**Last Updated**: 2026-01-09
