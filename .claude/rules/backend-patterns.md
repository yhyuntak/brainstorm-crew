---
paths:
  - "backend/**/*.py"
---

# Backend Code Patterns

> 백엔드 코드 작성 시 반드시 따라야 할 패턴들

---

## 프로젝트 구조

```
backend/app/
├── agents/           # Agentic 시스템
│   ├── orchestrator.py  # 메인 Orchestrator (LLM 기반 자율 탐색)
│   ├── tools/           # Tool 구현체들
│   └── test/            # 에이전트 테스트
├── aggregators/      # 데이터 집계 (Cross-Section Context 등)
├── api/              # FastAPI 라우터 (엔드포인트 정의)
├── briefing/         # AI 브리핑 생성
├── core/             # 핵심 인프라 (예외, 로깅 등)
├── economic/         # 경제 데이터 도메인
│   └── providers/       # 경제 데이터 Provider들 (FRED 등)
├── integrations/     # 외부 서비스 통합
│   ├── fmp/             # FMP API 클라이언트
│   └── llm/             # LLM (Claude + Grok) 통합
├── market/           # 시장 데이터 도메인
│   └── providers/       # 시장 데이터 Provider들
├── models/           # SQLAlchemy ORM 모델
├── scheduler/        # 스케줄링 (APScheduler)
├── shared/           # 공유 유틸리티
├── stock/            # 개별 종목 데이터
├── youtube/          # YouTube 요약 서비스
└── main.py           # FastAPI 앱 진입점
```

---

## 1. 예외 처리 패턴

**예외 계층 구조** (`core/exceptions.py`):
```python
# 모든 예외는 core/exceptions.py에서 중앙 관리
from app.core.exceptions import ProviderError, RateLimitError, DataNotAvailableError

# 계층 구조
AppError (base)
├── ClientError (외부 API)
│   ├── ProviderError(provider, message)
│   ├── RateLimitError(provider, limit, reset_time)
│   ├── DataNotAvailableError(provider, identifier)
│   └── NetworkError(provider, message)
└── ServiceError (비즈니스 로직)
    └── BriefingGenerationError
```

**사용 예시**:
```python
from app.core.exceptions import ProviderError, RateLimitError

raise ProviderError("FRED", "Connection timeout")
raise RateLimitError("FMP", limit=250, reset_time="00:00 UTC")
```

---

## 2. API 응답 패턴

**표준 에러 응답 형식**:
```json
{
  "code": "INVALID_PARAMETER",
  "message": "Invalid indicator type: xyz",
  "detail": {
    "parameter": "indicator_type",
    "valid_values": ["gdp", "cpi", "unemployment"]
  }
}
```

**에러 팩토리 함수 사용** (`api/errors.py`):
```python
from app.api.errors import (
    invalid_parameter_error,
    data_not_available_error,
    service_unavailable_error,
)

raise invalid_parameter_error(
    parameter="indicator_type",
    message="Invalid indicator type",
    valid_values=["gdp", "cpi"],
)
```

**API 라우터 패턴**:
```python
from fastapi import APIRouter, Depends, Query
from functools import lru_cache

router = APIRouter(prefix="/api/economic", tags=["Economic Data"])

@lru_cache
def get_economic_service() -> EconomicService:
    """서비스 싱글톤 (의존성 주입)"""
    return EconomicService()

@router.get("/indicator/{indicator_type}")
async def get_indicator(
    indicator_type: str,
    force_refresh: bool = Query(False),
    service: EconomicService = Depends(get_economic_service),
) -> dict[str, Any]:
    ...
```

---

## 3. Provider 패턴

**추상 인터페이스 정의**:
```python
from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class EconomicIndicator:
    """표준 데이터 구조 (모든 Provider 공통)"""
    indicator_type: IndicatorType
    value: float
    date: date
    unit: str
    source: str

class EconomicDataProvider(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    async def get_gdp(self) -> EconomicIndicator:
        pass
```

**Provider 구현**:
```python
from app.shared.http import http_get
from app.core.exceptions import DataNotAvailableError

class FREDEconomicProvider(EconomicDataProvider):
    @property
    def name(self) -> str:
        return "FRED"

    async def get_gdp(self) -> EconomicIndicator:
        data = await http_get(
            url=self.FRED_BASE_URL,
            params={"series_id": "GDP"},
            provider_name="FRED",
        )
        if not data:
            raise DataNotAvailableError("FRED", "GDP")
        return EconomicIndicator(...)
```

---

## 4. 서비스 레이어 패턴

```python
class EconomicService:
    """
    경제 지표 통합 서비스
    - 다중 Provider 지원 (Fallback 체인)
    - TTL 기반 캐싱
    """

    FALLBACK_CHAIN = {
        IndicatorType.GDP: ["FRED", "BLS"],
        IndicatorType.TREASURY_10Y: ["FRED", "Treasury"],
    }

    async def _get_with_fallback(self, indicator: IndicatorType):
        for provider_name in self.FALLBACK_CHAIN[indicator]:
            try:
                return await self._providers[provider_name].get_indicator(indicator)
            except RateLimitError:
                continue
        raise DataNotAvailableError("All", indicator.value)
```

---

## 5. 의존성 주입 패턴

**서비스 싱글톤**:
```python
from functools import lru_cache
from fastapi import Depends

@lru_cache
def get_economic_service() -> EconomicService:
    return EconomicService()

@router.get("/data")
async def get_data(service: EconomicService = Depends(get_economic_service)):
    ...
```

**DB 세션**:
```python
from app.database import get_db
from sqlalchemy.orm import Session

@router.get("/db-data")
async def get_db_data(db: Session = Depends(get_db)):
    ...
```

---

## 6. 로깅 패턴

```python
from app.core.logging import get_logger

logger = get_logger(__name__)

# 이벤트 기반 로깅 (key=value 형식)
logger.info("economic_data_fetched", indicator="GDP", value=27610.1, source="FRED")
logger.warning("rate_limit_approaching", provider="FMP", usage_percent=80)
logger.error("api_call_failed", endpoint="/data", status_code=500, exc_info=True)
```

---

## 7. 캐시 패턴

**SimpleCache (메모리)** - 외부 API 데이터:
```python
from app.shared.cache import SimpleCache

cache = SimpleCache()
cache.set("GDP", {"value": 27610.1})
value = cache.get("GDP", ttl_hours=24)
```

**FileCache (파일)** - AI 브리핑 등:
```python
from app.shared.cache import FileCache

cache = FileCache(cache_dir=".cache")
cache.set("briefing", {"text": "..."})
value = cache.get("briefing", ttl_hours=12)
```

---

## 8. LLM Router 패턴

> Policy 기반 LLM 라우팅 - 작업 유형별 최적 LLM 자동 선택

**정책 종류**:
| 정책 | 설명 | Provider 선택 |
|------|------|--------------|
| `default` | 시간대 기반 | 08~18시 Claude, 나머지 Grok |
| `youtube_summary` | 품질 우선 | Claude (시간대 고려) |
| `daily_briefing` | 비용 우선 | 항상 Grok |
| `analysis` | 품질 우선 | Claude (시간대 고려) |
| `agent` | 속도 우선 | 항상 Grok |

**사용 예시**:
```python
from app.integrations.llm import llm_router

# 기본 (시간대 기반)
response = await llm_router.generate_async(prompt=...)

# 정책 지정
response = await llm_router.generate_async(
    prompt=transcript,
    policy="youtube_summary",  # 품질 우선
)

# 현재 선택될 Provider 확인
provider = llm_router.get_current_provider(policy="youtube_summary")
```

**새 정책 추가** (`integrations/llm/router.py`):
```python
ROUTING_POLICIES["my_service"] = RoutingPolicy(
    priority=["claude", "grok"],  # 우선순위
    use_time_rules=True,          # 시간대 룰 적용 여부
)
```

---

## 9. Orchestrator Factory 패턴

> Policy 기반 Orchestrator 자동 선택 - LLM Provider에 따라 적합한 Orchestrator 반환

**Orchestrator 종류**:
| Orchestrator | Provider | 특징 |
|--------------|----------|------|
| `ClaudeOrchestrator` | Claude | SDK 네이티브 Tool Calling |
| `GeneralOrchestrator` | Grok/기타 | XML 기반 Tool Calling |

**사용 예시**:
```python
from app.agents import get_orchestrator

# Policy에 따라 적절한 Orchestrator 반환
orchestrator = get_orchestrator(policy="analysis")
response = await orchestrator.run(initial_context)

# 직접 Orchestrator 사용 (특정 Provider 고정 시)
from app.agents import GeneralOrchestrator, ClaudeOrchestrator

orchestrator = GeneralOrchestrator()  # 항상 XML 기반
orchestrator = ClaudeOrchestrator()   # 항상 Claude SDK
```

**동작 원리**:
1. `get_orchestrator(policy)` 호출
2. `llm_router.get_current_provider(policy)` 로 현재 Provider 확인
3. Claude → `ClaudeOrchestrator`, 그 외 → `GeneralOrchestrator` 반환

---

## 10. Agentic System XML 형식

> 에이전트 시스템의 모든 구조화된 데이터는 XML 형식 사용

**Tool 호출 형식** (LLM → System):
```xml
<tool_call>
{"name": "get_market_detail", "params": {"symbols": ["NVDA", "AAPL"]}}
</tool_call>
```

**Tool 결과 형식** (System → LLM):
```xml
<tool_result name="get_market_detail">
{"symbol": "NVDA", "price": 140.5, "change_percent": 3.2}
</tool_result>
```

---

## 11. Market Calculation Utilities

> 가격/비율 데이터 계산 시 `shared/market_utils.py` 사용

**목적**:
- 프로젝트 전반에 걸쳐 중복된 계산 로직을 제거하고 일관성을 유지
- 백분위, 이동평균, 트렌드 판단 등 금융 계산 로직을 중앙 관리

**제공 함수**:
```python
from app.shared.market_utils import (
    calculate_percentile,         # 백분위 계산 (0-100)
    calculate_moving_average,     # 이동평균 (50일, 200일 등)
    determine_trend_by_ma,        # 50MA vs 200MA 트렌드
    calculate_vs_percent,         # 기준가 대비 %
    interpret_position,           # 한글 해석 ("52주 고점 근처" 등)
    calculate_change_rate,        # % 변화율 vs pp 차이
    calculate_trend_from_ma,      # 현재가 vs 20일MA 트렌드
)
```

**사용 예시**:

**DO**:
```python
from app.shared.market_utils import calculate_moving_average, calculate_percentile

# 이동평균 계산
ma_50 = calculate_moving_average(values, 50)
ma_200 = calculate_moving_average(values, 200)

# 백분위 계산
percentile = calculate_percentile(current, low, high)

# 변화율 계산 (GDP 등 절대값 지표)
change_pct = calculate_change_rate(current, previous, is_rate=False)

# pp 차이 계산 (금리 등 비율 지표)
change_pp = calculate_change_rate(current, previous, is_rate=True)

# 트렌드 판단
trend = calculate_trend_from_ma(current, ma_20d, threshold=0.02)
```

**DON'T**:
```python
# ❌ 직접 계산 금지 - 중복 코드 발생
ma_50 = sum(values[-50:]) / 50  # calculate_moving_average() 사용
percentile = ((current - low) / (high - low)) * 100  # calculate_percentile() 사용
change_pct = (current - prev) / prev * 100  # calculate_change_rate() 사용
```

**주의사항**:
- 모든 함수는 엣지 케이스 처리 포함 (division by zero, empty list, None 등)
- 리스트 기반 계산 시 순서 확인 (오래된 순 → 최신 순 가정)
- 히스토리 데이터가 최신순인 경우 리버스 필요: `values[::-1]`

---

## 12. Timezone 패턴

> **weaveFi는 KST 기준으로 통일합니다**

### 핵심 원칙

1. **DB 저장**: KST timezone-aware datetime
2. **로직 처리**: KST 기준 (스케줄러, 비즈니스 로직)
3. **외부 API**: UTC로 변환하여 호출, 응답은 KST로 변환
4. **로깅**: KST 기준 (가독성)

### 이유

- 사용자가 한국인만 (글로벌 서비스 계획 없음)
- 모든 비즈니스 로직이 KST 기준 ("08~18시 Claude", "아침 9시 브리핑")
- 코드 단순화 (`if hour >= 8` vs `if hour >= 23 or hour < 9`)
- 로그 가독성 (서버 로그 = 실제 시간)

### 사용 패턴

**기본 사용** (`shared/timezone.py`):
```python
from app.shared.timezone import now_kst, KST, format_kst

# 현재 시간
current = now_kst()

# DB 저장
model.created_at = now_kst()
model.updated_at = now_kst()

# 시간 비교 (TTL 체크 등)
cutoff_time = now_kst() - timedelta(hours=24)
if model.created_at < cutoff_time:
    refresh_data()

# 스케줄링 (LLM Router 등)
if now_kst().hour >= 8 and now_kst().hour < 18:
    use_claude()

# 로깅
logger.info("task_started", timestamp=format_kst(now_kst()))
```

**DB 모델 정의**:
```python
from sqlalchemy import DateTime
from sqlalchemy.sql import func

class MyModel(Base):
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),  # timezone-aware
        server_default=func.now(),  # PostgreSQL now() (KST 기준)
        comment="생성 시각 (KST)",
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        comment="수정 시각 (KST)",
    )
```

**외부 API 연동**:
```python
from app.shared.timezone import kst_to_utc, utc_to_kst, now_kst

# API 호출 시 (UTC 변환)
params = {
    "from": kst_to_utc(start_date).strftime("%Y-%m-%d"),
    "to": kst_to_utc(end_date).strftime("%Y-%m-%d"),
}

# API 응답 파싱 (KST 변환)
published_at = utc_to_kst(datetime.fromisoformat(data["published_at"]))
```

**Legacy 데이터 처리** (DB에서 읽은 naive datetime):
```python
from app.shared.timezone import naive_to_kst

# DB에서 읽은 naive datetime
model = db.query(MyModel).first()
kst_time = naive_to_kst(model.created_at)
```

### PostgreSQL 설정

DB 서버의 timezone을 KST로 설정해야 `func.now()`가 KST를 반환합니다:

```sql
-- 현재 설정 확인
SHOW timezone;

-- KST 설정 (필요 시)
ALTER DATABASE weavefi SET timezone = 'Asia/Seoul';
```

### 마이그레이션 체크리스트

기존 naive datetime 컬럼을 timezone-aware로 변경할 때:

1. **컬럼 타입 변경**:
   ```sql
   ALTER TABLE table_name
   ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
   USING created_at AT TIME ZONE 'Asia/Seoul';
   ```

2. **기존 데이터가 UTC인 경우**:
   ```sql
   ALTER TABLE table_name
   ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
   USING created_at AT TIME ZONE 'UTC';
   ```

3. **SQLAlchemy 모델 업데이트**:
   ```python
   # 변경 전
   created_at = Column(DateTime)

   # 변경 후
   created_at: Mapped[datetime.datetime] = mapped_column(
       DateTime(timezone=True),
       server_default=func.now(),
   )
   ```

---

## Do's and Don'ts

**DO**:
```python
from app.core.exceptions import ProviderError  # 예외는 core에서
raise invalid_parameter_error(...)              # API 에러는 팩토리
logger = get_logger(__name__)                   # 로거 사용
service = Depends(get_economic_service)         # 의존성 주입
from app.core.config import settings            # 설정 싱글톤
await http_get(url=..., provider_name="FRED")   # HTTP 유틸
from app.integrations.llm import llm_router     # LLM Router 싱글톤
orchestrator = get_orchestrator(policy="...")   # Orchestrator Factory
from app.shared.market_utils import calculate_moving_average  # 시장 계산 유틸
```

**DON'T**:
```python
class MyError(Exception): pass      # 직접 Exception 정의 금지
raise HTTPException(...)            # 직접 HTTPException 금지
print("debug")                      # print 금지 - logger 사용
async with httpx.AsyncClient():     # 직접 httpx 금지
API_KEY = "xxx"                     # 하드코딩 금지
client = GrokClient()               # 직접 LLM 클라이언트 금지 - llm_router 사용
```
