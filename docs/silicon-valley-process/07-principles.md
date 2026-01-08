# 7. 핵심 원칙 (Principles)

> 30년 실리콘밸리 경험에서 배운 교훈들

---

## 핵심 철학

### 1. Ship Early, Ship Often

완벽한 v1.0보다 빠르게 배포하고 반복

```
Week 1: PoC → 내부 테스트
Week 2: MVP → 베타 유저 5명
Week 4: v0.1 → 배포 (beta tag)
Week 8: v1.0 → 정식 론칭
```

---

### 2. Make it Work, Make it Right, Make it Fast

1. **Work**: 일단 동작하게 (ugly code OK)
2. **Right**: 리팩토링, 테스트 추가
3. **Fast**: 성능 최적화

**순서가 중요하다!** 처음부터 완벽하게 하려고 하지 말 것.

---

### 3. Measure Everything

추측하지 말고 데이터를 본다

- "사용자가 좋아할 것 같아" ❌
- "베타 유저 10명 중 8명이 이 기능을 사용했다" ✅

---

### 4. Fail Fast

실패할 거면 빨리 실패하고, 빨리 배우고, 빨리 고친다

- 큰 베팅보다 작은 실험
- 가설 → 검증 → 학습 사이클

---

### 5. Done is Better Than Perfect

완벽을 추구하다 아무것도 출시 못하는 것보다, 80%짜리라도 출시하는 게 낫다

---

### 6. Speed is a Feature

- First week commits code
- Demo early, demo often
- Bias for action

---

### 7. Small Teams, Big Impact

- Two-pizza teams (8명 이하)
- Autonomy
- Ownership: "이건 내 프로젝트"

---

### 8. Customer-Centric from Day 1

- 코드 한 줄 쓰기 전에 10명과 인터뷰
- Dogfood religiously (자기 제품 사용)
- 완벽한 첫 출시는 환상

---

### 9. Technical Excellence

- Sprint 0에 투자하라
- 반복 작업은 모두 자동화
- 모니터링은 처음부터

---

### 10. Clear Decision Making

- Disagree and commit
- Document decisions (ADR)
- 작은 결정은 팀이, 큰 결정만 escalate

---

## 성공/실패 프로젝트의 공통점

### 가장 성공적인 프로젝트들
1. 명확한 문제 정의 (고객의 real pain)
2. 작게 시작, 빠르게 학습
3. 뛰어난 팀 (능력 + 케미스트리)
4. 강력한 Executive Sponsorship
5. 기술적 탁월함에 대한 타협 없는 집착

### 가장 실패한 프로젝트들
1. 해결책을 찾는 문제 (problem looking for solution)
2. 너무 큰 scope (boil the ocean)
3. 팀 내 신뢰 부족
4. 기술 부채 방치
5. 고객과 단절

---

## 전체 체크리스트

### Week 1 End
- [ ] 모든 팀원이 kickoff meeting 참여
- [ ] Team working agreement 수립
- [ ] Dev environment 모두 설정 완료
- [ ] First commit to main branch
- [ ] Communication channels 설정

### Week 2 End
- [ ] Architecture design doc 완성 & 승인
- [ ] PRD v1 완성
- [ ] Sprint 0 완료
- [ ] CI/CD pipeline 동작
- [ ] First deployment to dev environment

### Week 4 End
- [ ] MVP scope 확정 & backlog 생성
- [ ] User research 5+ interviews 완료
- [ ] Technical spike/POC 완료 (필요시)
- [ ] First demo to stakeholders

### Week 6-8 End
- [ ] Core functionality 구현
- [ ] Test coverage >70%
- [ ] Monitoring dashboards 동작
- [ ] First external demo (alpha users)

---

## 마지막 조언

> "Perfect is the enemy of shipped.
> Start small, learn fast, iterate relentlessly.
> And most importantly: Build something people actually want."

프로젝트 시작은 마라톤의 출발선입니다.
잘 준비하되, 완벽을 기다리지 마세요.
**첫 걸음을 떼는 것이 가장 중요합니다.**

---

*"The best time to plant a tree was 20 years ago. The second best time is now."*

---

[← 이전: 실행 단계](06-execution.md) | [목차](README.md)
