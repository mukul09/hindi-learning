# Mobile-Friendly Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Hindi learning site comfortable on phones via a bottom tab bar, enlarged touch targets, and several CSS fixes.

**Architecture:** One new file (`css/mobile.css`) holds all mobile overrides. `index.html` gains a `<nav id="bottom-nav">` element and a link to the new CSS. `js/app.js` gets three lines added to `navigate()` to sync the active tab. No existing CSS files are modified.

**Tech Stack:** Plain HTML, CSS custom properties, vanilla JS. No build step. Open `index.html` directly in a browser to test. Use browser DevTools → Toggle Device Toolbar (Ctrl+Shift+M) to simulate a phone.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `css/mobile.css` | **Create** | All mobile-only CSS overrides |
| `index.html` | **Modify** | Add `<link>` for mobile.css; add `<nav id="bottom-nav">` before `</body>` |
| `js/app.js` | **Modify** | Sync active class to bottom nav inside `navigate()` |

---

## Task 1: Create mobile.css and link it

**Files:**
- Create: `css/mobile.css`
- Modify: `index.html`

- [ ] **Step 1: Create `css/mobile.css` with a header comment**

```css
/* ── Mobile Overrides ── */
/* All rules here are scoped to @media (max-width: 768px) unless noted.  */
/* Desktop layout (layout.css, components.css, etc.) is not modified.    */
```

- [ ] **Step 2: Add the `<link>` to `index.html`**

Find the last existing CSS `<link>` tag (currently `css/animations.css`) and add the new one directly after it:

```html
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/mobile.css">
```

- [ ] **Step 3: Verify the file loads**

Open `index.html` in a browser. Open DevTools → Console. No 404 errors for `mobile.css`.

- [ ] **Step 4: Commit**

```bash
git add css/mobile.css index.html
git commit -m "feat: add mobile.css and link from index.html"
```

---

## Task 2: Add bottom nav HTML to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `<nav id="bottom-nav">` before `</body>`**

Find the closing `</body>` tag at the bottom of `index.html`. Insert this block immediately before it (after the closing `</script>` tag):

```html
  <!-- ── Bottom Navigation (mobile) ── -->
  <nav id="bottom-nav">
    <button class="bottom-tab" data-section="home" onclick="APP.navigate('home')">
      <span class="bottom-tab-icon">🏠</span>
      <span class="bottom-tab-label">Home</span>
    </button>
    <button class="bottom-tab" data-section="lessons" onclick="APP.navigate('lessons')">
      <span class="bottom-tab-icon">🔤</span>
      <span class="bottom-tab-label">Script</span>
    </button>
    <button class="bottom-tab" data-section="vocab" onclick="APP.navigate('vocab')">
      <span class="bottom-tab-icon">📚</span>
      <span class="bottom-tab-label">Vocab</span>
    </button>
    <button class="bottom-tab" data-section="quiz" onclick="APP.navigate('quiz')">
      <span class="bottom-tab-icon">🎯</span>
      <span class="bottom-tab-label">Quiz</span>
    </button>
    <button class="bottom-tab" data-section="progress" onclick="APP.navigate('progress')">
      <span class="bottom-tab-icon">📊</span>
      <span class="bottom-tab-label">Progress</span>
    </button>
  </nav>
```

- [ ] **Step 2: Verify the HTML is present**

Open `index.html` in a browser. Open DevTools → Elements. Confirm `<nav id="bottom-nav">` exists with 5 child buttons. The nav is invisible on desktop at this point (no CSS yet) — that's expected.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add bottom nav HTML markup"
```

---

## Task 3: Add bottom nav CSS

**Files:**
- Modify: `css/mobile.css`

- [ ] **Step 1: Append bottom nav styles to `css/mobile.css`**

```css
/* ── Bottom Navigation Bar ── */
#bottom-nav {
  display: none; /* hidden on desktop */
}

@media (max-width: 768px) {
  #bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: var(--color-surface);
    border-top: 2px solid var(--color-border);
    z-index: 100;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
  }

  .bottom-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-height: 56px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-muted);
    transition: color var(--transition-fast);
    padding: 0;
  }

  .bottom-tab.active {
    color: var(--color-primary);
  }

  .bottom-tab-icon {
    font-size: 1.2rem;
    line-height: 1;
  }

  .bottom-tab-label {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2px;
  }

  /* Hide top nav links and stats — bottom nav replaces them */
  .nav-links,
  .nav-stats {
    display: none;
  }

  /* Push content up so bottom nav doesn't overlap it */
  #app {
    padding-bottom: 56px;
  }
}
```

- [ ] **Step 2: Verify in browser at mobile width**

Open `index.html`. DevTools → Toggle Device Toolbar → set width to 375px (iPhone). You should see:
- Bottom bar with 5 icon+label tabs
- Top nav links and XP/streak stats are hidden
- Brand name ("हिंदी Learn") still visible in top bar
- Page content is not hidden behind the bottom bar

- [ ] **Step 3: Verify desktop is unchanged**

Set DevTools width back to 1200px. Bottom nav should be invisible. Top nav links and stats should be visible as before.

- [ ] **Step 4: Commit**

```bash
git add css/mobile.css
git commit -m "feat: add bottom nav CSS, hide top nav links on mobile"
```

---

## Task 4: Sync active state in app.js

**Files:**
- Modify: `js/app.js`

- [ ] **Step 1: Add active-state sync to `navigate()`**

In `js/app.js`, find this block inside `navigate()`:

```javascript
    const navLink = $(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) navLink.classList.add('active');
```

Add three lines immediately after it:

```javascript
    const navLink = $(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) navLink.classList.add('active');

    // Sync bottom nav active state
    $$('#bottom-nav .bottom-tab').forEach(btn => btn.classList.remove('active'));
    const bottomTab = $(`#bottom-nav .bottom-tab[data-section="${sectionId}"]`);
    if (bottomTab) bottomTab.classList.add('active');
```

- [ ] **Step 2: Verify active state in browser**

Open `index.html` at 375px width in DevTools. Click each bottom tab in turn. The tapped tab should turn orange (`var(--color-primary)`). The previously active tab should return to grey. Reload the page — the active tab should match the current section (default: Home).

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "feat: sync active class to bottom nav in APP.navigate()"
```

---

## Task 5: Enlarge touch targets

**Files:**
- Modify: `css/mobile.css`

- [ ] **Step 1: Append touch target rules to `css/mobile.css`**

```css
/* ── Touch Targets (minimum 44px) ── */
@media (max-width: 768px) {
  /* Small buttons (Pronounce, Learn/Unlearn) */
  .btn-sm {
    min-height: 44px;
    padding: 8px var(--space-md);
  }

  /* Pronounce button on flip cards */
  .btn-pronounce {
    min-height: 44px;
    padding: 8px var(--space-md);
  }

  /* Vocab card action buttons */
  .word-actions .btn {
    min-height: 44px;
  }

  /* Quiz Check / Next buttons — full width for easy thumb tap */
  .quiz-nav {
    flex-direction: column;
    align-items: stretch;
  }

  .quiz-nav .btn {
    width: 100%;
    min-height: 52px;
  }
}
```

- [ ] **Step 2: Verify in browser at 375px**

- Open the Script (Lessons) section. Flip a card. On the back, the Pronounce button should be at least 44px tall and easy to tap.
- Open Vocabulary. The 🔊 and ☆ buttons on each word card should be taller.
- Open Quiz. Start any quiz. The "Check" button at the bottom should span the full width.

- [ ] **Step 3: Commit**

```bash
git add css/mobile.css
git commit -m "feat: enlarge touch targets to 44px min on mobile"
```

---

## Task 6: Fix fill-in-the-blank input and MC options

**Files:**
- Modify: `css/mobile.css`

- [ ] **Step 1: Append quiz input and MC option rules to `css/mobile.css`**

```css
/* ── Quiz Input & Multiple Choice ── */
@media (max-width: 768px) {
  /* Fill-in-the-blank: remove fixed width that overflows narrow screens */
  .fill-blank-input {
    width: 100%;
    max-width: 300px;
  }

  /* Multiple choice: taller options for comfortable tapping */
  .mc-option {
    min-height: 56px;
    padding: var(--space-md);
  }
}
```

- [ ] **Step 2: Verify in browser at 375px**

- Start a fill-in-the-blank quiz (e.g. "Script Fill-in"). The text input should fit within the screen width with no horizontal scrollbar.
- Start a multiple choice quiz. Each answer option should be noticeably taller and easier to tap.

- [ ] **Step 3: Commit**

```bash
git add css/mobile.css
git commit -m "feat: fix fill-blank input width and enlarge MC options on mobile"
```

---

## Task 7: Scrollable lesson tabs

**Files:**
- Modify: `css/mobile.css`

- [ ] **Step 1: Append tab scroll rules to `css/mobile.css`**

```css
/* ── Scrollable Lesson Tabs ── */
@media (max-width: 768px) {
  /* Smooth momentum scrolling on iOS */
  .tab-bar {
    -webkit-overflow-scrolling: touch;
    position: relative;
  }

  /* Right-edge fade hints that more tabs are off-screen */
  .tab-bar::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 2px; /* sits above the border-bottom */
    width: 32px;
    background: linear-gradient(to right, transparent, var(--color-bg));
    pointer-events: none;
  }

  /* Larger tap area for each lesson tab */
  .lesson-tab-btn {
    padding: 12px 16px;
  }
}
```

- [ ] **Step 2: Verify in browser at 375px**

Open the Script section. You should see:
- Tabs (🅰️ Vowels · 🔤 Consonants · ✍️ Matras) are scrollable horizontally
- A subtle fade gradient on the right edge hints there's more content
- Each tab has a larger tap area

- [ ] **Step 3: Final full-site check at 375px**

Navigate through all 5 sections on mobile and confirm:
- [ ] Bottom nav visible and functional
- [ ] Top nav links/stats hidden
- [ ] Brand name still showing in top bar
- [ ] No horizontal overflow/scrollbar on any section
- [ ] All buttons are comfortably tappable

- [ ] **Step 4: Verify desktop unchanged at 1200px**

- [ ] Bottom nav hidden
- [ ] Top nav links and stats visible
- [ ] No layout regressions on any section

- [ ] **Step 5: Commit**

```bash
git add css/mobile.css
git commit -m "feat: smooth-scroll lesson tabs with fade hint on mobile"
```
