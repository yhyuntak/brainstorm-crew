---
name: api-reference
description: API 문서를 효율적으로 조회합니다. FRED, FMP, Slack 등 데이터 제공자의 엔드포인트, 파라미터, rate limit, 인증 정보가 필요할 때 사용.
---

# API Reference Navigator

---

## Provider Index

| Provider | Purpose | Files | Rate Limit |
|----------|---------|-------|------------|
| **FRED** | Economic data (primary) | 1 | 250/day |
| **BLS** | Labor statistics | 1 | 500/day |
| **Treasury** | Government fiscal data | 1 | Generous |
| **FMP** | Financial/market data | 13 | 250/day |
| **Alpha Vantage** | Market data (fallback) | 1 | 25/day (free) |
| **Anthropic** | AI analysis (Claude) | 1 | Usage-based |
| **Slack** | Notifications | 1 | Tier-based |

---

## FRED (Federal Reserve Economic Data)
**Role**: Primary economic data source (free, reliable)
**Doc**: [fred_economic_data.md](backend/docs/api/fred/fred_economic_data.md) (282 lines)

### Quick Reference
```
Base URL: https://api.stlouisfed.org/fred
Auth: API Key (free)
Rate Limit: 250 requests/day
```

### Key Series IDs
| ID | Data | Frequency |
|----|------|-----------|
| `GDP` | Gross Domestic Product | Quarterly |
| `CPIAUCSL` | Consumer Price Index | Monthly |
| `UNRATE` | Unemployment Rate | Monthly |
| `FEDFUNDS` | Federal Funds Rate | Monthly |
| `DGS10` | 10-Year Treasury Rate | Daily |
| `T10Y2Y` | 10Y-2Y Treasury Spread | Daily |

---

## BLS (Bureau of Labor Statistics)
**Role**: Labor data fallback/supplement
**Doc**: [bls_labor_statistics.md](backend/docs/api/bls/bls_labor_statistics.md) (~200 lines)

### Quick Reference
```
Base URL: https://api.bls.gov/publicAPI/v2
Auth: API Key (optional, increases limits)
Rate Limit: 500/day (with key)
```

### Key Series IDs
| ID | Data |
|----|------|
| `LNS14000000` | Unemployment Rate |
| `CUUR0000SA0` | CPI All Urban |
| `CES0000000001` | Total Nonfarm Payroll |

---

## Treasury FiscalData
**Role**: Government debt, fiscal data
**Doc**: [treasury_fiscaldata.md](backend/docs/api/treasury/treasury_fiscaldata.md) (~220 lines)

### Quick Reference
```
Base URL: https://api.fiscaldata.treasury.gov/services/api/fiscal_service
Auth: None required
Rate Limit: Generous (no strict limit)
```

### Key Endpoints
| Endpoint | Data |
|----------|------|
| `/v2/accounting/od/debt_to_penny` | National debt |
| `/v2/accounting/od/avg_interest_rates` | Treasury rates |
| `/v1/accounting/dts/dts_table_1` | Daily Treasury Statement |

---

## FMP (Financial Modeling Prep)
**Role**: Comprehensive financial data
**Docs**: 13 domain-specific files

### Document Index
| Domain | File | Key Endpoints |
|--------|------|---------------|
| Market Data | [fmp_market_data.md](backend/docs/api/fmp/fmp_market_data.md) | Quotes, historical prices |
| Company Info | [fmp_company_info.md](backend/docs/api/fmp/fmp_company_info.md) | Profile, peers, executives |
| Financials | [fmp_financials.md](backend/docs/api/fmp/fmp_financials.md) | Income, balance sheet, cash flow |
| Economics | [fmp_economics.md](backend/docs/api/fmp/fmp_economics.md) | GDP, CPI, treasury rates |
| Analyst | [fmp_analyst_estimates.md](backend/docs/api/fmp/fmp_analyst_estimates.md) | Estimates, recommendations |
| Calendar | [fmp_calendar_events.md](backend/docs/api/fmp/fmp_calendar_events.md) | Earnings, dividends, splits |
| ETF/Funds | [fmp_etf_funds.md](backend/docs/api/fmp/fmp_etf_funds.md) | ETF holdings, sector weights |
| Institutional | [fmp_institutional.md](backend/docs/api/fmp/fmp_institutional.md) | 13F filings, insider trades |
| News | [fmp_news_sentiment.md](backend/docs/api/fmp/fmp_news_sentiment.md) | News, sentiment |
| SEC Filings | [fmp_sec_filings.md](backend/docs/api/fmp/fmp_sec_filings.md) | 10-K, 10-Q, 8-K |
| Technical | [fmp_technical.md](backend/docs/api/fmp/fmp_technical.md) | RSI, SMA, EMA |
| Transcripts | [fmp_transcripts.md](backend/docs/api/fmp/fmp_transcripts.md) | Earnings call transcripts |
| Other | [fmp_other.md](backend/docs/api/fmp/fmp_other.md) | Stock screener, bulk data |

### Quick Reference
```
Base URL: https://financialmodelingprep.com/api
Auth: API Key (query param)
Rate Limit: 250/day (free), higher tiers available
```

---

## Alpha Vantage
**Role**: Market data fallback
**Doc**: [alpha_vantage_market_data.md](backend/docs/api/alpha-vantage/alpha_vantage_market_data.md) (~300 lines)

### Quick Reference
```
Base URL: https://www.alphavantage.co/query
Auth: API Key (query param)
Rate Limit: 25/day (free), 500/min (premium)
```

### Key Functions
| Function | Data |
|----------|------|
| `TIME_SERIES_DAILY` | Daily OHLCV |
| `GLOBAL_QUOTE` | Real-time quote |
| `OVERVIEW` | Company fundamentals |
| `REAL_GDP` | GDP data |
| `CPI` | Consumer Price Index |

---

## Anthropic (Claude API)
**Role**: AI market analysis, insights
**Doc**: [anthropic_claude_ai.md](backend/docs/api/anthropic/anthropic_claude_ai.md) (~280 lines)

### Quick Reference
```
Base URL: https://api.anthropic.com/v1
Auth: x-api-key header
Rate Limit: Usage-based (tokens/min)
Models: claude-sonnet-4-20250514, claude-3-5-haiku-20241022
```

### Key Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/messages` | Chat completions |
| Tool Use | Function calling |
| Vision | Image analysis |

---

## Slack (Web API)
**Role**: Daily briefing, alerts
**Doc**: [slack_messaging.md](backend/docs/api/slack/slack_messaging.md) (~250 lines)

### Quick Reference
```
Base URL: https://slack.com/api
Auth: Bot Token (xoxb-...)
Rate Limit: Tier-based (varies by method)
```

### Key Methods
| Method | Purpose |
|--------|---------|
| `chat.postMessage` | Send messages |
| `chat.update` | Update messages |
| Block Kit | Rich formatting |

---

## Provider Fallback Chain

```
Economic Data:
  FRED (primary) → BLS (labor) → Treasury (fiscal) → FMP (paid)

Market Data:
  FMP (primary) → Alpha Vantage (fallback)

AI Analysis:
  Claude API (no fallback)

Notifications:
  Slack API (no fallback)
```

---

## How to Use This Skill

### Provider Selection
- "FRED API 사용법?" → Read FRED section above
- "FMP 재무제표 API?" → Read [fmp_financials.md](backend/docs/api/fmp/fmp_financials.md)
- "Slack 메시지 보내기?" → Read [slack_messaging.md](backend/docs/api/slack/slack_messaging.md)

### Common Queries
| Query | Action |
|-------|--------|
| Rate limit 확인 | Check table above |
| Auth 방식 | Check Quick Reference section |
| 특정 endpoint | Read specific doc file |
| Series ID 찾기 | Check Key Series IDs tables |

---

## Token Optimization

| Query Type | Action | Tokens Saved |
|------------|--------|--------------|
| Rate limit check | Use this index | ~95% |
| Auth method | Use this index | ~95% |
| Specific endpoint | Read one doc | ~80% |
| Full API reference | Read all docs | 0% |

---

**Last Updated**: 2025-12-09
**Total Files**: 19 (across 7 providers)
