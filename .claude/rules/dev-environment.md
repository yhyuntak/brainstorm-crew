---
paths:
  - "*.toml"
  - "*.lock"
  - "alembic/**"
  - "backend/**/*.py"
---

# Development Environment

> 개발 환경 설정 및 실행 지침

---

## 패키지 관리 (uv + pyproject.toml)

**중요**: `pip install` 직접 사용 금지. 반드시 `uv` 사용.

```bash
cd backend

# 프로덕션 패키지 추가
uv add <package>==<version>

# 개발 패키지 추가
uv add --dev <package>==<version>

# 패키지 제거
uv remove <package>

# 환경 동기화
uv sync
```

**의존성 파일**:
- `pyproject.toml`: 직접 의존성 정의
- `uv.lock`: 전체 의존성 트리 (Git 커밋)

---

## 서버 실행

```bash
# FastAPI 개발 서버
cd backend
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 또는
uv run python app/main.py
```

---

## 데이터베이스 연결

### 로컬 개발 (localhost)

로컬 PostgreSQL을 사용합니다.

```bash
# 연결 정보
Host: localhost
Port: 5432
DB: weavefi_local
User: (macOS 사용자명)

# DB 생성 (최초 1회)
createdb weavefi_local

# psql 직접 연결
psql -d weavefi_local
```

### Private/Public 서버 (NAS)

NAS에서 Docker로 실행 중입니다.

```bash
# 연결 정보 - backend/.env 참조
Host: 100.103.243.64
Port: 60021
DB: weavefi
User: weavefi
Password: (backend/.env의 DATABASE_URL 참조)

# psql 직접 연결 (.env에서 비밀번호 확인)
PGPASSWORD='<.env 참조>' psql -h 100.103.243.64 -p 60021 -U weavefi -d weavefi

# Python 스크립트 실행 시 (.env 자동 로드됨)
cd backend && .venv/bin/python script.py
```

> **참고**: 민감 정보는 `backend/.env`에 있습니다. Git에 커밋되지 않습니다.

---

## 데이터베이스 마이그레이션

```bash
cd backend

# 마이그레이션 파일 생성
uv run alembic revision --autogenerate -m "description"

# 마이그레이션 적용
uv run alembic upgrade head

# 롤백
uv run alembic downgrade -1
```

---

## 테스트 실행

```bash
cd backend
uv run pytest
```

---

## Python 스크립트 실행

**중요**: 백엔드에는 `.venv`가 이미 설정되어 있습니다. 스크립트 실행 시 직접 사용하세요.

### 기본 원칙

```bash
cd backend

# ✅ 올바른 방법 - .venv/bin/python 직접 사용
.venv/bin/python test_script.py
.venv/bin/python -m pytest tests/

# ❌ 피해야 할 방법 - 불필요하게 복잡
~/.local/bin/uv run python test_script.py
uv run python test_script.py
```

### 이유

- `.venv`는 `uv`로 생성되어 모든 패키지가 이미 설치됨
- `uv run`을 거칠 필요 없이 `.venv/bin/python`을 직접 사용하면 됨
- Claude Code의 Bash 환경에서 `uv` 명령어가 PATH에 없을 수 있음
- 더 간단하고 명확함

### uv run이 필요한 경우

다음 작업은 `uv`의 프로젝트 관리 기능이 필요하므로 `uv run` 사용:

```bash
# 서버 실행 (환경변수 로드 등)
uv run uvicorn app.main:app --reload

# 패키지 설치 후 즉시 실행
uv add requests
uv run python script.py  # 새 패키지 사용
```

---

## 프론트엔드 실행

```bash
cd frontend
pnpm install
pnpm dev
```
