# Demo recordings

The GIFs on my profile are recorded by script, not by hand, so I can regenerate any of them after a UI change.

Each scene in `scenes.mjs` drives a live demo with Playwright and shows one engineering decision. It adds a visible cursor and a caption naming the decision.

```bash
npm install && npx playwright install chromium   # once
brew install ffmpeg gifski                       # once
node scenes.mjs            # record all (or: node scenes.mjs sano vantage)
node encode.mjs            # raw/*.webm -> out/*.mp4 + out/*.gif
cp out/*.gif ../assets/
```

- `lib.mjs`: recorder helpers: cursor and caption overlay, smooth scrolling, `fastForward()` for model calls and onboarding
- `scenes.mjs`: one function per project
- `jt/jt.tape`: the jt terminal demo, recorded with [vhs](https://github.com/charmbracelet/vhs) (`brew install vhs`, then `cd jt && vhs jt.tape`). `jt/seed.sh` fills a throwaway database with fictional companies, so the recording never touches real data.
- `encode.mjs`: cuts the initial page load, speeds up `fastForward` spans, and exports an MP4 plus a 720px GIF
