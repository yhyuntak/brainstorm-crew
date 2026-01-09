#!/bin/bash
#
# Claude Code Stop Hook - 턴 종료 시 전체 검증
#
# Backend: ruff check (린트 + 문법)
# Frontend: tsc --noEmit (타입체크 + 문법)
#

set -e

# PATH 확장 (node, pnpm, homebrew 등)
export PATH="$HOME/.local/bin:/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin:$PATH"

PROJECT_DIR="$CLAUDE_PROJECT_DIR"
ERRORS_FOUND=0

echo "🔍 Running validation checks..." >&2

# ============================================
# Backend: ruff check --fix (자동 수정 후 검증)
# ============================================
if [ -d "$PROJECT_DIR/backend" ]; then
    echo "" >&2
    echo "📦 Backend (ruff check --fix)..." >&2
    cd "$PROJECT_DIR/backend"

    # 1. 자동 수정 시도
    .venv/bin/ruff check app/ --fix --quiet 2>/dev/null || true

    # 2. 수정 후에도 에러가 있는지 확인
    if ! .venv/bin/ruff check app/ 2>&1; then
        echo "" >&2
        echo "❌ Backend ruff check failed (unfixable errors)!" >&2
        ERRORS_FOUND=1
    else
        echo "✅ Backend ruff check passed" >&2
    fi
fi

# ============================================
# Frontend: tsc --noEmit
# ============================================
if [ -d "$PROJECT_DIR/frontend" ]; then
    echo "" >&2
    echo "📦 Frontend (tsc --noEmit)..." >&2
    cd "$PROJECT_DIR/frontend"

    if ! ./node_modules/.bin/tsc --noEmit 2>&1; then
        echo "" >&2
        echo "❌ Frontend TypeScript check failed!" >&2
        ERRORS_FOUND=1
    else
        echo "✅ Frontend TypeScript check passed" >&2
    fi
fi

# ============================================
# 결과 반환
# ============================================
echo "" >&2
if [ $ERRORS_FOUND -eq 1 ]; then
    echo "⚠️  Validation issues found. Please fix before proceeding." >&2
    exit 2  # Exit code 2: Claude에게 피드백 전달
fi

echo "✅ All validation checks passed!" >&2
exit 0
