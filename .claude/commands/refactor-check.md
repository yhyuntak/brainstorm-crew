# Refactor Check Command

> Universal refactoring assessment for any codebase

## When to Run This Command

User types: `/refactor-check` or `/rc`

---

## Assessment Framework

### 1. Code Smells (Universal Red Flags)

**Function-Level**
- **Long Function**: >50 lines (complexity smell)
- **Too Many Parameters**: >3-4 parameters (coupling smell)
- **Deep Nesting**: >3 levels of if/for/while (cognitive load)
- **Magic Numbers**: Unexplained constants in logic
- **Boolean Flags**: Function behavior changes by boolean param

**Class/Module-Level**
- **God Object**: One class/module doing too much (>500 lines)
- **Feature Envy**: Using other class's data more than own
- **Shotgun Surgery**: One change requires edits in many places
- **Divergent Change**: One class changes for multiple reasons

**Code-Level**
- **Duplicate Code**: Same logic in 2+ places (DRY violation)
- **Dead Code**: Unused functions/variables/imports
- **Comments Explaining What**: Code unclear without comment
- **Inconsistent Naming**: Similar things named differently

**Error Handling Smells**
- **Silent Failures**: Empty catch blocks that swallow errors
- **Generic Exceptions**: Catching all errors the same way
- **Error Hiding**: Returning default values instead of surfacing errors

**Performance Smells**
- **N+1 Query**: DB/API calls inside loops
- **Premature Optimization**: Optimizing without measuring
- **Memory Leak**: Event listeners not cleaned up, large objects held

**Data Flow Smells**
- **Mutable Globals**: Global state modified from multiple places
- **Side Effects Everywhere**: Functions changing external state
- **No Single Source of Truth**: Same data duplicated in multiple places

---

### 2. Structural Issues

**Architecture Red Flags**
- **Circular Dependencies**: A imports B, B imports A
- **Missing Abstractions**: Concrete implementations everywhere
- **Wrong Abstraction**: Abstraction doesn't match reality
- **Tight Coupling**: Can't change A without changing B

**Organization Issues**
- **No Clear Boundaries**: Everything can access everything
- **Mixed Concerns**: Business logic + UI + data access together
- **Implicit Dependencies**: Order of operations matters unexpectedly
- **Hidden Coupling**: Globals, singletons, shared mutable state

---

### 3. Priority Matrix

```
Impact vs Effort

High Impact, Low Effort  → DO NOW (Quick wins)
High Impact, High Effort → PLAN (Major refactor)
Low Impact, Low Effort   → BACKLOG (Nice to have)
Low Impact, High Effort  → SKIP (Not worth it)
```

**High Impact Signals**
- Changes require touching 5+ files
- Bug-prone area (frequent fixes)
- Hard to test (complex setup)
- Slows down new features
- Team avoids touching it

**Low Effort Signals**
- Rename/extract function
- Extract constant
- Remove dead code
- Add missing types/interfaces

---

### 4. Refactoring Red Lights (DON'T REFACTOR)

**Stop If**
- **No Tests**: Write tests first
- **Active Development**: Feature work in progress
- **Deadline Pressure**: Less than 2 weeks to ship
- **Unclear Requirements**: Don't know what "better" means
- **Pre-Optimization**: No performance problem measured

**Danger Zones**
- **Legacy Integration Points**: Old code that "just works"
- **Hot Paths**: Production critical paths without tests
- **Complex Business Logic**: Without domain expert review
- **Security-Critical Code**: Needs security audit after

---

### 5. Refactoring Checklist

Before refactoring:
- [ ] Tests exist and pass
- [ ] Understand current behavior fully
- [ ] Have clear goal (faster? clearer? testable?)
- [ ] Can revert easily (git branch, small changes)
- [ ] No production deadline in 2 weeks

During refactoring:
- [ ] One thing at a time (rename OR restructure, not both)
- [ ] Tests still pass at each step
- [ ] Commit frequently (working state)
- [ ] No new features mixed in

After refactoring:
- [ ] All tests still pass
- [ ] Code review completed
- [ ] Documentation updated (if public API)
- [ ] No performance regression (if hot path)
- [ ] **New coding rules added to `.claude/rules/project-rules.md`** (if established during refactoring)

---

## Assessment Output Format

When running this command, Claude will:

1. **Scan codebase** (or specified files)
2. **List findings** in priority order:

```
## Quick Wins (High Impact, Low Effort)
- [file:line] Issue description
  Priority: P0/P1/P2
  Impact: [explain why it matters]
  Effort: [estimated time]

## Major Refactors (High Impact, High Effort)
- ...

## Nice to Have (Low Impact, Low Effort)
- ...

## Skip These (Low Impact, High Effort)
- ...

## Red Lights (Don't Refactor)
- ...
```

3. **Recommend top 3** actionable items

---

## Post-Refactoring Requirements

**IMPORTANT**: After completing refactoring work, if you established any new coding patterns or rules:

1. **Document the rules** in `.claude/rules/project-rules.md`
2. **Include examples** of before/after code
3. **Explain the reasoning** (why this rule helps)
4. **Commit the changes** with a descriptive message

**Examples of rules to document:**
- New naming conventions (e.g., Service suffix for all services)
- New code organization patterns (e.g., splitting God Objects)
- New tooling requirements (e.g., using logger instead of console.log)
- New constant management patterns (e.g., extracting magic numbers to designTokens)

This ensures the entire team (humans and AI) follows the same standards going forward.

---

## Common Patterns by Language

**Python**
- Long functions in notebooks
- Missing type hints in complex functions
- Global state in modules

**JavaScript/TypeScript**
- Callback hell / promise chains
- Any types everywhere
- Unclear prop drilling

**Java/C#**
- Inheritance over composition
- God objects
- Checked exceptions hiding errors

**Go**
- Error handling repetition
- Interface pollution
- Missing context propagation

---

## Silicon Valley Best Practices

**Google's Approach**
- "Readable Code > Clever Code"
- 15-minute rule: Can someone understand in 15 min?
- Refactor on touch: Improve code you're already changing

**Netflix's Approach**
- "Freedom and Responsibility"
- Team decides when to refactor
- Must have metrics to prove improvement

**Stripe's Approach**
- "Incremental correctness"
- Small PRs, frequent refactors
- Refactor is normal work, not special

---

## When to Say No

**Team says**: "Let's refactor everything!"
**You say**: "What specific problem are we solving?"

**Team says**: "This code is ugly!"
**You say**: "Is it causing bugs or slowing us down?"

**Team says**: "We should use [new pattern]!"
**You say**: "What's wrong with current approach?"

---

## Remember

- **Working code > Perfect code**
- **Tests > Refactoring > Features** (order of priority)
- **Refactoring is not rewriting** (preserve behavior)
- **Best refactor is the one you don't need** (write it right first)

---

**Philosophy**: "Make it work, make it right, make it fast" - in that order.
