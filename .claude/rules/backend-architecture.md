---
paths:
  - "backend/**/*.py"
---

# Backend Architecture

> 백엔드 레이어 분리 원칙 - 새 기능 구현 전 필수 숙지

---

## 프로젝트 구조

```
backend/app/
├── core/             # 인프라 (예외, 로깅, DB, 설정)
├── shared/           # 공유 유틸리티 (cache, http, timezone, market_utils)
├── models/           # 공통 DB 모델
├── integrations/     # 외부 서비스 연동
│   ├── llm/             # LLM Router (Claude + Grok)
│   ├── fmp/             # FMP API 클라이언트
│   └── slack.py         # Slack 알림
├── agents/           # AI Orchestrator + Tools
├── aggregators/      # 데이터 집계 (Dashboard)
├── scheduler/        # 스케줄러 (APScheduler)
│
└── {domain}/         # 도메인 모듈 (아래 구조)
    ├── economic/
    ├── market/
    ├── youtube/
    ├── stock/
    ├── analysis/
    └── briefing/
```

---

## 도메인 모듈 구조

```
{domain}/
├── router.py       # API 엔드포인트 (얇게!)
├── service.py      # 비즈니스 로직 (핵심)
├── repository.py   # DB CRUD
├── models.py       # SQLAlchemy ORM
├── types.py        # Pydantic 스키마
├── interfaces.py   # 추상 인터페이스 (선택)
└── providers/      # 외부 API 호출
```

---

## 레이어 흐름

```
Router → Service → Repository (DB)
                 → Provider (외부 API)
```

| 레이어 | 책임 | 예시 |
|--------|------|------|
| **Router** | HTTP만 | 파라미터 검증, 응답 변환 |
| **Service** | 비즈니스 로직 | 캐싱, 조합, Fallback |
| **Repository** | DB 접근 | SQLAlchemy CRUD |
| **Provider** | 외부 API | FRED, FMP, yfinance |

---

## DO / DON'T

### Router (얇게!)

```python
# ✅ DO
@router.get("/videos")
async def list_videos(
    db: Session = Depends(get_db),
    service: YouTubeService = Depends(get_youtube_service),
):
    return await service.list_videos(db)

# ❌ DON'T - 비즈니스 로직 금지
@router.get("/videos")
async def list_videos(db: Session = Depends(get_db)):
    videos = db.query(YouTubeSummary).filter(...).all()
    for v in videos:
        if v.status == "pending":
            await generate_summary(v)  # 로직이 라우터에!
    return videos
```

### Service

```python
# ✅ DO
class YouTubeService:
    def __init__(self):
        self.repository = YouTubeRepository()

    async def get_video(self, db: Session, video_id: str):
        return await self.repository.get_by_id(db, video_id)

# ❌ DON'T - SQL 직접 작성 금지
async def get_video(self, db: Session, video_id: str):
    result = db.execute(text("SELECT * FROM ..."))
```

### Repository

```python
# ✅ DO - SQLAlchemy ORM만
class YouTubeRepository:
    async def get_by_id(self, db: Session, video_id: str):
        return db.query(YouTubeSummary).filter_by(video_id=video_id).first()
```

### Provider

```python
# ✅ DO
class FREDProvider:
    async def get_gdp(self) -> EconomicIndicator:
        data = await http_get(url=..., provider_name="FRED")
        return self._parse(data)
```

---

## 새 기능 구현 체크리스트

| 작업 | 레이어 |
|------|--------|
| HTTP 파싱/응답 | Router |
| 비즈니스 규칙 | Service |
| DB CRUD | Repository |
| 외부 API | Provider |

---

## 좋은 예시 파일

| 파일 | 설명 |
|------|------|
| `aggregators/router.py` | 얇은 라우터 |
| `youtube/service.py` | Service 패턴 |
| `youtube/repository.py` | Repository 분리 |
| `economic/providers/fred.py` | Provider 패턴 |

---

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| 라우터에 if/else 로직 | Service로 이동 |
| Service에서 db.execute() | Repository 사용 |
| 라우터에서 Provider 직접 호출 | Service 경유 |
| Provider에서 캐싱 | Service로 이동 |
