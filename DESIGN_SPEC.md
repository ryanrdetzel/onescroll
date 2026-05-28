# DESIGN_SPEC.md — onescroll.dev

Two zones: the **spine** (rules) and the **creative space** (freedom).
The spine is what makes the site feel like a site. The creative space
is what makes each topic feel like itself.

---

## Spine — non-negotiable

Every topic page must:

1. **Be a single self-contained HTML file.** All CSS in `<style>`, all
   JS in `<script>`. No build step. No external JS dependencies at
   runtime (a single Google Fonts `<link>` is fine).

2. **Include the head meta.**
   ```html
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>TOPIC · onescroll.dev</title>
   <meta name="description" content="...">
   ```

3. **Include the metadata block:**
   ```html
   <script type="application/json" id="onescroll-meta">
   { "topic":"slug", "title":"...", "generated":"YYYY-MM-DD",
     "volatility":"evergreen|slow|fast",
     "sources":[{"title":"...","url":"...","date":"YYYY-MM-DD"}] }
   </script>
   ```

4. **Load the shared freshness assets:**
   ```html
   <link rel="stylesheet" href="/_shared/freshness.css">
   <script src="/_shared/freshness.js"></script>
   ```

5. **Have a back-link** to `/` with class `onescroll-backlink`.
   Style it however the page's design demands, but it has to be visible
   and reachable from any scroll position.

6. **Be responsive.** Works at 375px wide. No horizontal scroll
   except inside intentional containers (code blocks, wide tables).

7. **Be accessible.**
   - One `<h1>`. Headings in order.
   - Use `<main>`, `<section>`, `<nav>` semantically.
   - WCAG AA contrast (4.5:1) on body text. Use a contrast checker.
   - Respect `prefers-reduced-motion`.
   - Tappable targets ≥ 44×44px on mobile.

8. **Survive without JS.** Animation can degrade. Content must read.

9. **Have no trackers.** No analytics, no beacons, no third-party
   scripts beyond fonts.

---

## Creative space — go make it yours

Everything below is a design choice the agent makes per topic. Pick
intentionally. The cardinal sin is "generic AI-generated landing page
with three icon cards." Commit to a point of view.

### Pick a vibe
What does this topic feel like? OAuth is locks and trust → midnight
+ gold. Postgres is solid, durable, slightly retro → wood/cream/navy.
JavaScript async is motion and chaos → bright, energetic, animated.
Don't sample everything. Pick one direction and commit.

### Palette
- Dark or light, warm or cool, muted or saturated — your call.
- Use 1 accent color, 1–2 neutrals, and the rest is spacing.
- Test in both light and dark OS settings if you can.

### Typography
- One display family, one body family is plenty.
- Mono for code. Mix serif + sans deliberately or use one well.
- Body text 16–18px. Line-height 1.5–1.7.
- Long-form pages need a max content width (~70ch / ~720px).

### Layout
- One long page. Sections that breathe. Generous vertical rhythm.
- Don't try to be clever with horizontal sections, scroll-jacking,
  or one-screen-at-a-time gimmicks unless it genuinely serves the topic.
- "Onescroll" means "one document," not "no scrolling."

### Motion
- Animation should help comprehension, not decorate.
- A flow diagram revealing as you scroll = great. A floating gradient
  blob that pulses = no.
- Honor `prefers-reduced-motion`. Test it.

### What every deep dive needs (content-wise)
Most topics benefit from including:
- A **one-line "what problem does this solve"** up top.
- A **core mental model** — the simplest possible mental picture
  that doesn't lie.
- **Concrete mechanics** — code, diagrams, examples. Not just prose.
- **Common mistakes** — where everyone gets this wrong.
- **A decider section** — "use X when Y, use Z when W."
- **A 3-sentence summary** at the end — the elevator pitch of the topic.
- **Sources** at the bottom, with dates.

You can reorder, rename, or skip any of these if the topic genuinely
calls for something else. But don't skip them because you couldn't be
bothered.

### What to avoid
- Generic three-card "Features" section.
- Stock gradient backgrounds with no rationale.
- Emoji as a substitute for actual iconography.
- Lorem ipsum or placeholder text in committed pages.
- Animations with no off-switch.
- "Modern, sleek, professional" — these aren't aesthetic directions.

---

## The smell test

Before committing, ask:
- Would someone learning this topic actually understand it after one read?
- Does the design feel like *this* topic, not *every* topic?
- Could a screen-reader user follow this?
- Is anything here just decoration?

If yes / yes / yes / no — ship it.
