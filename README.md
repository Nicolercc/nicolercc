<a href="https://nicolerodriguez.dev">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
    <img alt="Nicole Rodriguez, full-stack engineer in New York: I build AI products that show their evidence. The model proposes, code checks, and a person decides anything the code can't prove." src="assets/hero-light.svg" width="100%">
  </picture>
</a>

<p>
  <a href="https://www.linkedin.com/in/nicolerodriguezz/"><img alt="Open to full-stack and applied-AI roles, NYC or remote" src="https://img.shields.io/badge/open_to-full--stack_%26_applied--AI_roles-23855A?style=flat-square"></a>
  <a href="https://nicolerodriguez.dev"><img alt="Portfolio" src="https://img.shields.io/badge/portfolio-nicolerodriguez.dev-16181D?style=flat-square"></a>
  <a href="https://www.linkedin.com/in/nicolerodriguezz/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-nicolerodriguezz-0A66C2?style=flat-square&logo=linkedin&logoColor=white"></a>
  <a href="mailto:nicolerodriguezcab@gmail.com"><img alt="Email" src="https://img.shields.io/badge/email-say_hi-9B2C43?style=flat-square&logo=maildotru&logoColor=white"></a>
</p>

I came to engineering from media, where the job is knowing what you can stand behind. I build software the same way. A reader should always be able to see **where a claim came from**, **what the product isn't sure of**, and **who made the call**. When a model is involved, it proposes. Deterministic code checks. Anything the code can't prove gets labelled or goes to a person.

## Proof, not promises

Every number below links to the README section or test suite that backs it.

| Project | What the tests and evals show | Receipt |
|---|---|---|
| **Vantage** | Deterministic quote checks alone stop **8 of 11** unsupported claims on a hand-labelled set, before a second model reviews what's left. **391 tests**, plus axe browser tests at phone and desktop width in CI. | [decisions](https://github.com/Nicolercc/vantage#key-engineering-decisions) · [tests](https://github.com/Nicolercc/vantage#testing-and-quality) |
| **Ruvia** | The model never produces the score; Python does. A forged-evidence API test proves every claim has to quote the resume. **61 tests**, `pip-audit` and `npm audit` clean. | [decisions](https://github.com/Nicolercc/ruvia#key-engineering-decisions) · [tests](https://github.com/Nicolercc/ruvia#testing-and-quality) |
| **jt** | **125 tests** on Python 3.11 and 3.12 with mypy. The classifier eval reports precision and recall with 95% intervals and tracks wrong terminal-state commits (target: zero). | [invariants](https://github.com/Nicolercc/jt#the-five-invariants) · [eval](https://github.com/Nicolercc/jt#measuring-the-classifier) |
| **Code4Kidz** | Audited an AI-built prototype: answer checks failed **29 of 123** cases, and every screen had **3–6** axe violations. Now **0**, enforced in CI. | [audit](https://github.com/Nicolercc/code4kidz#how-this-was-built) |
| **Sala** | **11 written privacy rules**, each mapped to the test that enforces it. **65 unit and browser tests**, with axe on every route and check-in step. | [rules](https://github.com/Nicolercc/Sala#privacy-requirements) · [tests](https://github.com/Nicolercc/Sala#testing) |
| **Sano** | Rules, not a model: every score can be reproduced from a [published formula](https://sano-nine.vercel.app/methodology), and a seed-integrity test fails if the app and the scorer ever disagree. | [decisions](https://github.com/Nicolercc/Sano#key-engineering-decisions) · [tests](https://github.com/Nicolercc/Sano#testing-and-quality) |

## Selected work

### AI with a trust boundary

#### [Vantage](https://github.com/Nicolercc/vantage): conflict briefs that quote their sources
[![live demo](https://img.shields.io/website?url=https%3A%2F%2Fconflict-analysis-vantage.vercel.app&label=live%20demo&style=flat-square)](https://conflict-analysis-vantage.vercel.app) [![CI](https://github.com/Nicolercc/vantage/actions/workflows/ci.yml/badge.svg)](https://github.com/Nicolercc/vantage/actions/workflows/ci.yml)

<a href="https://conflict-analysis-vantage.vercel.app"><img src="assets/vantage.gif" width="720" alt="Vantage builds a Sudan brief: find, write, check. Each key fact opens the exact quote it rests on, sources are listed, and model background is labelled."></a>

Type a conflict, get a brief built from live international reporting in about a minute.
**The decision:** provenance belongs to code, not the model. Claude refers to sources only by ID, and the publisher, URL and date come from retrieval. Anything without a source is labelled as model background.
<sub>React · TypeScript · Express · Postgres · OpenAPI → Zod · RAG · Claude</sub>

#### [Ruvia](https://github.com/Nicolercc/ruvia): recruiting review where a human decides
[![live demo](https://img.shields.io/website?url=https%3A%2F%2Fruvia.vercel.app&label=live%20demo&style=flat-square)](https://ruvia.vercel.app) [![CI](https://github.com/Nicolercc/ruvia/actions/workflows/ci.yml/badge.svg)](https://github.com/Nicolercc/ruvia/actions/workflows/ci.yml)

<a href="https://ruvia.vercel.app"><img src="assets/ruvia.gif" width="720" alt="Ruvia review: seeded-demo badge, deterministic score, criterion-by-criterion resume evidence, recruiter status"></a>

**The decision:** the LLM finds evidence, deterministic code scores it, and a recruiter makes the call. Ruvia never auto-rejects, and the public demo says plainly that it runs on seeded data.
<sub>FastAPI · Python · React · TypeScript · Claude</sub>

#### [jt](https://github.com/Nicolercc/jt): a job tracker where the LLM can't write to the database
[![CI](https://github.com/Nicolercc/jt/actions/workflows/ci.yml/badge.svg)](https://github.com/Nicolercc/jt/actions/workflows/ci.yml)

<a href="https://github.com/Nicolercc/jt"><img src="assets/jt.gif" alt="jt terminal demo: a model's 97%-confident onsite proposal for a rejected application is held for review, and a manual log past a terminal state is refused"></a>

A local-first CLI built on an append-only event log.
**The decision:** email is the reconciliation path, not the write path. The model proposes events, and only legal state transitions get committed, for the model and for me alike.
<sub>Python · SQLite · event sourcing · Gmail API · Claude · macOS menu bar</sub>

### Products where trust is the feature

#### [Sano](https://github.com/Nicolercc/Sano): the story behind a NYC restaurant grade
[![live demo](https://img.shields.io/website?url=https%3A%2F%2Fsano-nine.vercel.app&label=live%20demo&style=flat-square)](https://sano-nine.vercel.app) [![CI](https://github.com/Nicolercc/Sano/actions/workflows/ci.yml/badge.svg)](https://github.com/Nicolercc/Sano/actions/workflows/ci.yml)

<a href="https://sano-nine.vercel.app"><img src="assets/sano.gif" width="720" alt="Sano profile: official NYC inspection data shown separately from review context"></a>

**The decision:** official city records and consumer review data never share a field or a panel. The API returns `null` for anything without a source behind it.
<sub>Next.js · TypeScript · Python · NYC Open Data · Supabase (optional, falls back to a committed seed)</sub>

#### [Sala](https://github.com/Nicolercc/Sala): clinic check-in that can't leak a name to the waiting room
[![live demo](https://img.shields.io/website?url=https%3A%2F%2Fsala-privacy-board.netlify.app&label=live%20demo&style=flat-square)](https://sala-privacy-board.netlify.app) [![CI](https://github.com/Nicolercc/Sala/actions/workflows/ci.yml/badge.svg)](https://github.com/Nicolercc/Sala/actions/workflows/ci.yml)

<a href="https://sala-privacy-board.netlify.app"><img src="assets/sala.gif" width="720" alt="Sala: trying to send a patient name to the waiting-room board is blocked"></a>

**The decision:** the waiting-room board gets data only through an allow-list projection, and its renderer has no import path to patient records. Tests fail if a sensitive field ever reaches it.
<sub>React · TypeScript · Vitest · Playwright + axe</sub>

#### [Code4Kidz](https://github.com/Nicolercc/code4kidz): a real HTML course for kids 7–10
[![live demo](https://img.shields.io/website?url=https%3A%2F%2Fcode4kidz-six.vercel.app&label=live%20demo&style=flat-square)](https://code4kidz-six.vercel.app) [![CI](https://github.com/Nicolercc/code4kidz/actions/workflows/ci.yml/badge.svg)](https://github.com/Nicolercc/code4kidz/actions/workflows/ci.yml)

<a href="https://code4kidz-six.vercel.app"><img src="assets/code4kidz.gif" width="720" alt="Code4Kidz lesson: a near-miss answer is rejected, the correct one passes"></a>

**The decision:** treat an AI-built prototype as a draft, not a product. I audited it, then re-engineered it one concern per commit, each with the evidence it was tested on.
<sub>React · Vite · TypeScript · Zustand · CodeMirror · Playwright + axe</sub>

<details>
<summary><b>More projects</b></summary>
<br>

| Project | What it is |
|---|---|
| [writelater](https://github.com/Nicolercc/writelater) | Capture thoughts on the go, then know where to write them in your paper planner. |
| [Impactify](https://github.com/Nicolercc/impactify2.0) · [demo](https://impactify2-0.vercel.app) | Civic news → context → action. Next.js, Supabase, Claude. |
| [TripCanvas](https://github.com/Nicolercc/tripcanvas) | Travel planner that tells you whether each day is realistic. Client-side state machine with enforced invariants. |
| [NYC nuclear simulator](https://github.com/Nicolercc/nuclear-shelter-app) · [demo](https://nuclear-escape.vercel.app) | Educational emergency simulator: blast zones, shelters, evacuation routes. |
| [Morning Briefing Agent](https://github.com/Nicolercc/Morning-Briefing-Agent) | Local-first agent that turns Gmail, Calendar and Slack into one Slack digest. |
| [Parla](https://github.com/Nicolercc/Parla) · [demo](https://parla-rho.vercel.app) | Mobile-first Spanish-learning prototype with a unit path, quizzes, hearts and streaks. |
| [EGCS](https://github.com/Nicolercc/egcs) | Production marketing site for a NYC client. |

</details>

## Recently shipped

My latest merged pull request in each repo. A [GitHub Action](.github/workflows/shipped.yml) refreshes this table every day.

<!-- shipped:start -->
| Merged | Repo | Change |
|---|---|---|
| 2026-11-21 | [jt](https://github.com/Nicolercc/jt) | [Never record an alert as sent when macOS didn't deliver it (T1)](https://github.com/Nicolercc/jt/pull/59) |
| 2026-11-15 | [vantage](https://github.com/Nicolercc/vantage) | [Browser tests in CI: accessibility, layout and touch at phone and desktop size](https://github.com/Nicolercc/vantage/pull/29) |
| 2026-11-15 | [ruvia](https://github.com/Nicolercc/ruvia) | [Drive the header mode badge from /api/health](https://github.com/Nicolercc/ruvia/pull/2) |
| 2026-11-13 | [writelater](https://github.com/Nicolercc/writelater) | [Split ReviewScreen into a controller hook and per-view components](https://github.com/Nicolercc/writelater/pull/14) |
| 2026-11-12 | [code4kidz](https://github.com/Nicolercc/code4kidz) | [docs: add verified live demo walkthrough](https://github.com/Nicolercc/code4kidz/pull/3) |
| 2026-11-11 | [Sala](https://github.com/Nicolercc/Sala) | [Walkthrough + two demo fixes: realistic waits, no wait estimate for called patients](https://github.com/Nicolercc/Sala/pull/2) |
<!-- shipped:end -->

## Open source

| Status | Project | Contribution |
|---|---|---|
| [![state](https://img.shields.io/github/pulls/detail/state/PixelAndFlow/carbonshift/1?style=flat-square&label=)](https://github.com/PixelAndFlow/carbonshift/pull/1) | carbonshift | [Map integration](https://github.com/PixelAndFlow/carbonshift/pull/1) |
| [![state](https://img.shields.io/github/pulls/detail/state/oxc-project/oxc/27276?style=flat-square&label=)](https://github.com/oxc-project/oxc/pull/27276) | oxc (Rust JS toolchain) | [Linter rule `jest/padding-around-before-all-blocks`](https://github.com/oxc-project/oxc/pull/27276) |
| [![state](https://img.shields.io/github/pulls/detail/state/excalidraw/excalidraw/12147?style=flat-square&label=)](https://github.com/excalidraw/excalidraw/pull/12147) | Excalidraw | [Templates prototype](https://github.com/excalidraw/excalidraw/pull/12147) |

## How I build with AI

- **Claude Code builds, and Codex independently reviews** every significant change.
- **Model output is untrusted input.** It's validated, cited and tested before the UI shows it.
- **Small pull requests, CI on every repo.** Tests run against fake models, so CI needs no API keys and costs nothing.
- **READMEs cover decisions, tradeoffs and limits**, not just features. Every project above documents what it does not do.

## This profile is code, too

- The banner is an animated SVG drawn by [`scripts/hero.mjs`](scripts/hero.mjs), in light and dark versions.
- Every demo GIF is recorded by a [Playwright script](demos/scenes.mjs) against the live site, with captions naming the decision on screen. A [manual workflow](.github/workflows/demos.yml) re-records them and opens a pull request.
- The status badges are live: demos are pinged, CI is real, and open-source PR states update themselves.

<sub>New York · [nicolerodriguez.dev](https://nicolerodriguez.dev) · [LinkedIn](https://www.linkedin.com/in/nicolerodriguezz/) · [nicolerodriguezcab@gmail.com](mailto:nicolerodriguezcab@gmail.com)</sub>
