# onescroll.dev

Single-page deep dives. One topic per path.

Each `/topics/<slug>/` is a self-contained HTML page that deep-dives one
topic. No build, no framework — just inline HTML/CSS/JS. Every topic
gets its own design that suits the subject; a small shared spine keeps
the site coherent.

## Layout

```
.
├── index.html              # landing page, reads manifest.json
├── manifest.json           # list of topics + metadata
├── topics/<slug>/index.html
├── _shared/                # the only shared assets
│   ├── freshness.js        # stale-page banner
│   └── freshness.css
├── _template/page.html     # starting point for new topics
├── validate.mjs            # `node validate.mjs` — checks the spine
├── CLAUDE.md               # instructions for the agent
└── DESIGN_SPEC.md          # what's fixed vs free
```

## Adding a topic

See `CLAUDE.md`. Short version: copy `_template/page.html` to
`topics/<slug>/index.html`, write the deep dive with its own design,
update `manifest.json`, run `node validate.mjs`, commit.

## Freshness

Every page declares a `volatility` (`evergreen` / `slow` / `fast`). A
small script shows a "may be out of date" banner past a threshold — 3
years / 1 year / 6 months. The landing page surfaces stale topics so
they can be regenerated.

## Hosting

Static. Deployed via [deploymill](https://deploymill.com).
