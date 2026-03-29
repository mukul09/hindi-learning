# Mobile-Friendly Design Spec
**Date:** 2026-03-29
**Project:** Hindi Learning Website

## Overview

Make the Hindi learning site comfortable to use on phones. Four targeted improvements, all implemented in a new `css/mobile.css` file plus a small addition to `js/app.js`. No existing files are rewritten; the desktop layout is unchanged.

---

## 1. Bottom Navigation Bar

**What:** On screens ≤ 768px, hide the top nav links and stats. Add a fixed bottom tab bar with 5 tabs.

**Tabs:**
| Icon | Label |
|------|-------|
| 🏠 | Home |
| 🔤 | Script |
| 📚 | Vocab |
| 🎯 | Quiz |
| 📊 | Progress |

**HTML:** Add a `<nav id="bottom-nav">` element inside `<body>` in `index.html`, with one `<button>` per tab. Each button has `data-section` matching the existing section IDs (`home`, `lessons`, `vocab`, `quiz`, `progress`).

**CSS (`mobile.css`):**
- `.bottom-nav` — `position: fixed; bottom: 0; left: 0; right: 0; display: none` by default
- `@media (max-width: 768px)` — `display: flex`, 5 equal columns, `height: 56px`
- Each tab button — `min-height: 56px`, flex column (icon above label), full tap area
- Active tab — `color: var(--color-primary)`, inactive — `color: var(--color-text-muted)`
- Add `padding-bottom: 56px` to `#app` on mobile so content isn't hidden behind the bar
- Hide `.nav-links` and `.nav-stats` on mobile

**JS (`app.js`):** In `APP.navigate()`, after setting the active class on `.nav-links a`, add a parallel line that sets the active class on the matching `#bottom-nav button[data-section]`.

---

## 2. Touch Targets

**What:** Ensure all interactive elements meet the 44px minimum tap height on mobile.

**Changes (all in `mobile.css`, scoped to `@media (max-width: 768px)`):**
- `.btn-sm` — `min-height: 44px; padding: 8px 12px`
- `.btn-pronounce` — `min-height: 44px; padding: 8px 12px`
- `.quiz-nav .btn` — `width: 100%; min-height: 52px` (full-width, thumb-friendly)
- `.word-actions .btn` — `min-height: 44px`

---

## 3. Fill-in-the-blank Input & Quiz Options

**Fill-in-the-blank input (`mobile.css`):**
- Remove fixed `width: 240px` on mobile: `width: 100%; max-width: 300px`

**Multiple choice options (`mobile.css`, `@media (max-width: 768px)`):**
- `.mc-option` — `min-height: 56px; padding: var(--space-md)`
- Already single-column on `≤ 500px` via existing rule — keep that

---

## 4. Scrollable Lesson Tabs

**What:** Make the Vowels / Consonants / Matras tab bar visually scannable and smooth-scrolling on mobile.

**Changes (in `mobile.css`):**
- `.tab-bar` — add `-webkit-overflow-scrolling: touch`
- `.tab-bar` wrapper — add a `::after` pseudo-element fade gradient on the right edge to hint scrollability
- `.lesson-tab-btn` — increase padding to `12px 16px` on mobile for easier tapping

---

## Files Changed

| File | Change |
|------|--------|
| `css/mobile.css` | **New file** — all mobile overrides |
| `index.html` | Add `<link>` for `mobile.css`; add `<nav id="bottom-nav">` markup |
| `js/app.js` | Sync active class to bottom nav tabs in `APP.navigate()` |

## Files NOT Changed
All existing CSS files (`layout.css`, `components.css`, `lessons.css`, `quiz.css`, etc.) are left untouched.

---

## Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| `> 768px` | Desktop layout unchanged |
| `≤ 768px` | Bottom nav visible, top nav links/stats hidden, touch targets enlarged |
| `≤ 500px` | MC options already single-column (existing rule kept) |
| `≤ 480px` | Existing compact nav-link rules removed (superseded by bottom nav) |
