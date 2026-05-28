# CLAUDE.md — onescroll.dev

You are adding a topic to onescroll.dev. Read this and `DESIGN_SPEC.md`
before doing anything.

## The site in one paragraph

Each path `/topics/<slug>/` is a single self-contained HTML page that
deep-dives one topic. No build step. No framework. The page should
**actually teach the thing** — not be a generic skeleton. Each topic
gets its own design (colors, typography, layout, motion) that suits
the subject. There's a small shared spine — the rest is yours.

## Adding a new topic

1. **Decide the slug.** Lowercase, hyphenated, URL-safe: `oauth`,
   `javascript-async`, `postgres-mvcc`. It is the URL path.

2. **Create the directory** `topics/<slug>/` and put `index.html` in it.

3. **Start from `_template/page.html`.** Keep every line marked `SPINE`.
   Fill in everything marked `CREATIVE`.

4. **Write the deep dive.** Aim for actually-useful. Cover the problem,
   the core mental model, the concrete mechanics, common mistakes, and
   when to use what. Cite sources in the metadata block and in a
   `Sources` section at the bottom of the page.

5. **Pick a design that suits the topic.** See `DESIGN_SPEC.md` for
   the rules. Commit to one vibe. Inline all CSS and JS.

6. **Update `manifest.json`.** Append an object with `slug`, `title`,
   `blurb` (one sentence), `generated` (today's ISO date), and
   `volatility` (`evergreen` | `slow` | `fast`).

7. **Run `node validate.mjs`.** It fails on missing spine items.
   Fix anything it complains about.

8. **Commit.** Single commit per topic. Conventional message:
   `topic: add <slug>` or `topic: regenerate <slug>`.

## Volatility — be honest about it

- **`evergreen`** — fundamentals that haven't moved in a decade and won't.
  Examples: how TCP works, OAuth roles, SQL relational model, hash tables.
- **`slow`** — stable but evolving. Examples: HTTP, Postgres features,
  the JS language proper, container internals.
- **`fast`** — version-of-the-month territory. Examples: "best React
  state library", framework comparisons, AI tooling, JS bundler landscape.

Threshold for the stale banner: 3y / 1y / 6mo. If you'd be embarrassed
to publish the same content unchanged at that age, downgrade the
volatility.

## Regenerating an existing topic

Same flow, but bump `generated` in both the page's `<script
id="onescroll-meta">` and `manifest.json`. Keep the slug. If the
design still serves the topic, you can keep it; if you've learned to
explain something better, redesign.

## Constraints, not suggestions

- No npm dependencies in the topic page. Inline everything.
- No third-party JS at runtime. Self-hosted fonts or system stack only.
  Google Fonts via `<link>` is OK if you use one family.
- No trackers, analytics, or beacons.
- The page must render correctly with JS disabled (animation is fine
  to lose; the content must still read).
- Test at 375px wide before committing.

## What "good" looks like

Look at `topics/oauth/index.html`. It picked a vibe (midnight + gold,
locks/keys), kept the spine, used motion sparingly to reveal the flow
steps, and reads as a real deep dive — not a wiki summary. Aim for
that bar. Better is fine.
