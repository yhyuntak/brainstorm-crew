---
name: shadcn-ui
description: UI 컴포넌트 구현 시 적절한 shadcn/ui 컴포넌트를 추천하고 사용법을 안내합니다. React UI 컴포넌트가 필요할 때, Button, Card, Dialog, Table 등 일반적인 UI 요소가 필요할 때 사용.
---

# shadcn/ui Component Guide

---

## Component Index

| Category | Components | Count |
|----------|------------|-------|
| **Layout** | Card, Aspect Ratio, Scroll Area, Resizable, Separator | 5 |
| **Navigation** | Navigation Menu, Menubar, Sidebar, Breadcrumb, Tabs, Pagination | 6 |
| **Buttons** | Button, Button Group, Toggle, Toggle Group | 4 |
| **Form Inputs** | Input, Textarea, Checkbox, Select, Switch, Slider, Calendar... | 16 |
| **Feedback** | Alert, Dialog, Sheet, Drawer, Toast, Tooltip, Popover... | 11 |
| **Menus** | Dropdown Menu, Context Menu, Command | 3 |
| **Data Display** | Table, Avatar, Badge, Progress, Skeleton, Chart, Carousel... | 13 |
| **Utility** | Accordion, Collapsible, Kbd | 3 |

---

## Installation

```bash
# 프로젝트 초기 설정
pnpm dlx shadcn@latest init

# 개별 컴포넌트 추가
pnpm dlx shadcn@latest add [component-name]
```

---

## Layout & Container

| Component | Purpose | Install |
|-----------|---------|---------|
| **Card** | 콘텐츠 카드 컨테이너 | `pnpm dlx shadcn@latest add card` |
| **Aspect Ratio** | 종횡비 유지 | `pnpm dlx shadcn@latest add aspect-ratio` |
| **Scroll Area** | 커스텀 스크롤 | `pnpm dlx shadcn@latest add scroll-area` |
| **Resizable** | 크기 조절 패널 | `pnpm dlx shadcn@latest add resizable` |
| **Separator** | 구분선 | `pnpm dlx shadcn@latest add separator` |

### Card Example
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

## Navigation

| Component | Purpose | Install |
|-----------|---------|---------|
| **Navigation Menu** | 메인 네비게이션 | `pnpm dlx shadcn@latest add navigation-menu` |
| **Menubar** | 데스크탑 메뉴바 | `pnpm dlx shadcn@latest add menubar` |
| **Sidebar** | 사이드바 레이아웃 | `pnpm dlx shadcn@latest add sidebar` |
| **Breadcrumb** | 경로 표시 | `pnpm dlx shadcn@latest add breadcrumb` |
| **Tabs** | 탭 네비게이션 | `pnpm dlx shadcn@latest add tabs` |
| **Pagination** | 페이지네이션 | `pnpm dlx shadcn@latest add pagination` |

---

## Buttons & Actions

| Component | Purpose | Install |
|-----------|---------|---------|
| **Button** | 기본 버튼 | `pnpm dlx shadcn@latest add button` |
| **Button Group** | 버튼 그룹 | `pnpm dlx shadcn@latest add button-group` |
| **Toggle** | 토글 버튼 | `pnpm dlx shadcn@latest add toggle` |
| **Toggle Group** | 토글 그룹 | `pnpm dlx shadcn@latest add toggle-group` |

### Button Variants
```tsx
import { Button } from "@/components/ui/button"

// variants: default, destructive, outline, secondary, ghost, link
// sizes: default, sm, lg, icon
<Button variant="outline" size="sm">Click</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

---

## Form Inputs

| Component | Purpose | Install |
|-----------|---------|---------|
| **Input** | 텍스트 입력 | `pnpm dlx shadcn@latest add input` |
| **Input Group** | 입력 그룹 | `pnpm dlx shadcn@latest add input-group` |
| **Input OTP** | OTP 입력 | `pnpm dlx shadcn@latest add input-otp` |
| **Textarea** | 멀티라인 입력 | `pnpm dlx shadcn@latest add textarea` |
| **Checkbox** | 체크박스 | `pnpm dlx shadcn@latest add checkbox` |
| **Radio Group** | 라디오 버튼 | `pnpm dlx shadcn@latest add radio-group` |
| **Switch** | 스위치 | `pnpm dlx shadcn@latest add switch` |
| **Slider** | 슬라이더 | `pnpm dlx shadcn@latest add slider` |
| **Select** | 드롭다운 선택 | `pnpm dlx shadcn@latest add select` |
| **Native Select** | 네이티브 선택 | `pnpm dlx shadcn@latest add native-select` |
| **Combobox** | 검색 가능 선택 | `pnpm dlx shadcn@latest add combobox` |
| **Calendar** | 캘린더 | `pnpm dlx shadcn@latest add calendar` |
| **Date Picker** | 날짜 선택 | `pnpm dlx shadcn@latest add date-picker` |
| **Label** | 입력 레이블 | `pnpm dlx shadcn@latest add label` |
| **Field** | 폼 필드 래퍼 | `pnpm dlx shadcn@latest add field` |
| **Form** | React Hook Form 통합 | `pnpm dlx shadcn@latest add form` |

---

## Feedback & Overlay

| Component | Purpose | Install |
|-----------|---------|---------|
| **Alert** | 인라인 알림 | `pnpm dlx shadcn@latest add alert` |
| **Alert Dialog** | 확인 다이얼로그 | `pnpm dlx shadcn@latest add alert-dialog` |
| **Dialog** | 모달 | `pnpm dlx shadcn@latest add dialog` |
| **Sheet** | 사이드 패널 | `pnpm dlx shadcn@latest add sheet` |
| **Drawer** | 드로어 (모바일) | `pnpm dlx shadcn@latest add drawer` |
| **Toast** | 토스트 알림 | `pnpm dlx shadcn@latest add toast` |
| **Sonner** | 토스트 (권장) | `pnpm dlx shadcn@latest add sonner` |
| **Tooltip** | 툴팁 | `pnpm dlx shadcn@latest add tooltip` |
| **Popover** | 팝오버 | `pnpm dlx shadcn@latest add popover` |
| **Hover Card** | 호버 카드 | `pnpm dlx shadcn@latest add hover-card` |

### Dialog Example
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Alert Example
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

---

## Menus & Dropdowns

| Component | Purpose | Install |
|-----------|---------|---------|
| **Dropdown Menu** | 드롭다운 메뉴 | `pnpm dlx shadcn@latest add dropdown-menu` |
| **Context Menu** | 우클릭 메뉴 | `pnpm dlx shadcn@latest add context-menu` |
| **Command** | 커맨드 팔레트 | `pnpm dlx shadcn@latest add command` |

---

## Data Display

| Component | Purpose | Install |
|-----------|---------|---------|
| **Table** | 테이블 | `pnpm dlx shadcn@latest add table` |
| **Data Table** | 고급 테이블 | `pnpm dlx shadcn@latest add data-table` |
| **Avatar** | 프로필 아바타 | `pnpm dlx shadcn@latest add avatar` |
| **Badge** | 배지/태그 | `pnpm dlx shadcn@latest add badge` |
| **Progress** | 진행률 | `pnpm dlx shadcn@latest add progress` |
| **Skeleton** | 로딩 스켈레톤 | `pnpm dlx shadcn@latest add skeleton` |
| **Spinner** | 로딩 스피너 | `pnpm dlx shadcn@latest add spinner` |
| **Chart** | 차트 (Recharts) | `pnpm dlx shadcn@latest add chart` |
| **Carousel** | 캐러셀 | `pnpm dlx shadcn@latest add carousel` |
| **Item** | 리스트 아이템 | `pnpm dlx shadcn@latest add item` |
| **Empty** | 빈 상태 | `pnpm dlx shadcn@latest add empty` |
| **Typography** | 텍스트 스타일 | `pnpm dlx shadcn@latest add typography` |

### Skeleton Example
```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-12 w-12 rounded-full" />
```

---

## Utility

| Component | Purpose | Install |
|-----------|---------|---------|
| **Accordion** | 아코디언 | `pnpm dlx shadcn@latest add accordion` |
| **Collapsible** | 접기/펼치기 | `pnpm dlx shadcn@latest add collapsible` |
| **Kbd** | 키보드 단축키 | `pnpm dlx shadcn@latest add kbd` |

---

## Component Selection Guide

### Toast vs Sonner?
- **Toast**: 기본 토스트 (간단한 용도)
- **Sonner**: 풍부한 기능 (권장)

### Select vs Combobox?
- **Select**: 단순 드롭다운
- **Combobox**: 검색 가능 (Command 기반)

### Dialog vs Sheet vs Drawer?
- **Dialog**: 중앙 모달 (데스크탑)
- **Sheet**: 측면 패널 (설정, 필터)
- **Drawer**: 하단 드로어 (모바일)

### Table vs Data Table?
- **Table**: 정적 테이블
- **Data Table**: 정렬/필터/페이지네이션 (TanStack Table)

---

## How to Use This Skill

| Query | Action |
|-------|--------|
| "버튼 만들어줘" | Button section 참고 |
| "모달 필요해" | Dialog section 참고 |
| "로딩 UI" | Skeleton/Spinner section 참고 |
| "폼 입력" | Form Inputs section 참고 |
| "테이블 구현" | Table/Data Table section 참고 |

---

## References

- Official Docs: https://ui.shadcn.com/docs/components
- GitHub: https://github.com/shadcn-ui/ui

---

**Last Updated**: 2025-01-22
**Total Components**: 55+
