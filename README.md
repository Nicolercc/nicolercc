# Nicole Rodriguez

**Full-stack engineer building applied-AI products that show their evidence.**
React · TypeScript · Next.js · Python · FastAPI · PostgreSQL · Claude API. Based in New York.

I came to engineering from media, so I start with the reader: what they need to trust, what they need to do next, and where the product should say "I don't know." In practice that means AI features with sources, human review where it matters, and tests that keep model output honest.

[nicolerodriguez.dev](https://nicolerodriguez.dev) · [LinkedIn](https://www.linkedin.com/in/nicolerodriguezz/) · [Email](mailto:nicolerodriguezcab@gmail.com)

---

## Selected work

| Project | What it is | The engineering decision |
|---|---|---|
| **[Vantage](https://github.com/Nicolercc/vantage)** · [demo](https://conflict-analysis-vantage.vercel.app) | Conflict briefs from live international news | Claude only keeps claims it can tie to a retrieved source. Anything else is labelled as background knowledge. |
| **[Ruvia](https://github.com/Nicolercc/ruvia)** · [demo](https://ruvia.vercel.app) | Evidence-first recruiting review (FastAPI + React) | The LLM analyzes, deterministic code scores, and a human decides. Every supported claim cites resume evidence. |
| **[Sano](https://github.com/Nicolercc/Sano)** · [demo](https://sano-nine.vercel.app) | Plain-language context for NYC restaurant grades | Official data stays visually separate from derived signals. There's a methodology page and repeatable accessibility checks. |
| **[Code4Kidz](https://github.com/Nicolercc/code4kidz)** · [demo](https://code4kidz-six.vercel.app) | HTML/CSS course for kids 7–10 | I audited an AI-built prototype and re-engineered it: 29 of 123 answer checks fixed, 0 axe violations, enforced in CI. |
| **[jt](https://github.com/Nicolercc/jt)** | Local-first job tracker CLI (Python, SQLite) | It uses an append-only event log, and the LLM can propose changes but never commit them. |
| **[Sala](https://github.com/Nicolercc/Sala)** · [demo](https://sala-privacy-board.netlify.app) | Privacy-first clinic check-in | Data reaches the waiting-room board only through an allow-list projection. Tests fail if a sensitive field leaks. |

More: [Impactify](https://github.com/Nicolercc/impactify2.0) (civic news to action, Next.js + Supabase + Claude) · [TripCanvas](https://github.com/Nicolercc/tripcanvas) (realistic-day travel planner, state machine) · [EGCS](https://github.com/Nicolercc/egcs) (production site for a NYC client)

## Open source
- [oxc](https://github.com/oxc-project/oxc/pull/27276): linter rule `jest/padding-around-before-all-blocks` (in review)
- [excalidraw](https://github.com/excalidraw/excalidraw/pull/12147): templates prototype (in review)
- [carbonshift](https://github.com/PixelAndFlow/carbonshift/pull/1): map integration (merged)

## How I build with AI
- **Claude Code** for building, and **Codex** as an independent reviewer on every significant change
- Model output is treated as untrusted input: it gets validated, cited, and tested before the UI shows it
- Each repo includes a README covering its decisions and its limits, not just its features
