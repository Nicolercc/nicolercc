// Shared helpers for scripted demo recordings.
// Each scene records a video and a timeline of "fast-forward" spans that encode.mjs speeds up.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, renameSync, rmSync } from 'node:fs';

export const VIEWPORT = { width: 1280, height: 800 };

// Visible cursor, click ripple and caption pill, injected into every page.
const OVERLAY = `
(() => {
  if (window.__demoEnsure) { window.__demoEnsure(); return; }
  const css = document.createElement('style'); css.id = 'demo-css';
  css.textContent = \`
    #demo-cursor{position:fixed;z-index:2147483647;width:30px;height:30px;pointer-events:none;
      transform:translate(-3px,-2px);transition:left .45s cubic-bezier(.3,.7,.3,1),top .45s cubic-bezier(.3,.7,.3,1)}
    .demo-ripple{position:fixed;z-index:2147483646;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;
      border:2px solid #f59e0b;pointer-events:none;animation:demo-r .6s ease-out forwards}
    @keyframes demo-r{from{transform:scale(.3);opacity:1}to{transform:scale(1.6);opacity:0}}
    #demo-caption{position:fixed;z-index:2147483647;left:50%;bottom:28px;transform:translateX(-50%) translateY(8px);
      max-width:960px;padding:12px 20px;border-radius:12px;background:rgba(17,24,39,.92);color:#fff;
      font:600 20px/1.35 ui-sans-serif,system-ui,-apple-system,sans-serif;letter-spacing:-.01em;
      box-shadow:0 10px 30px rgba(0,0,0,.25);opacity:0;transition:opacity .3s,transform .3s;pointer-events:none;text-align:center}
    #demo-caption.on{opacity:1;transform:translateX(-50%) translateY(0)}
    #demo-caption b{color:#fbbf24;font-weight:700}
  \`;
  const cur = document.createElement('div'); cur.id = 'demo-cursor';
  cur.innerHTML = '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M3 2l7 19 2.6-7.4L20 11z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  cur.style.left = '640px'; cur.style.top = '420px';
  const cap = document.createElement('div'); cap.id = 'demo-caption';
  // Frameworks may re-render <body> and drop foreign nodes, so re-attach whenever needed.
  window.__demoEnsure = () => {
    if (!document.body) return;
    if (!css.isConnected) (document.head || document.documentElement).appendChild(css);
    if (!cur.isConnected) document.body.appendChild(cur);
    if (!cap.isConnected) document.body.appendChild(cap);
  };
  addEventListener('DOMContentLoaded', window.__demoEnsure);
  addEventListener('load', window.__demoEnsure);
  setInterval(window.__demoEnsure, 250);
  window.__demoEnsure();
})();`;

export async function scene(name, fn) {
  mkdirSync('raw', { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'no-preference',
    recordVideo: { dir: `raw/${name}-tmp`, size: VIEWPORT },
  });
  await context.addInitScript(OVERLAY);
  const page = await context.newPage();
  const t0 = Date.now();
  const spans = [];
  let cx = 640, cy = 420, startAt = 0;

  const d = {
    page,
    // Call once the first page has loaded; everything before it is cut.
    async start(url) {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(600);
      startAt = (Date.now() - t0) / 1000;
    },
    wait: ms => page.waitForTimeout(ms),
    async overlay() { await page.evaluate(OVERLAY); },
    async caption(html) {
      await d.overlay();
      await page.evaluate(h => { const c = document.getElementById('demo-caption'); if (!c) return;
        if (h) { c.innerHTML = h; c.classList.add('on'); } else c.classList.remove('on'); }, html ?? null);
    },
    async moveTo(x, y) {
      await d.overlay();
      await page.evaluate(([x, y]) => { const c = document.getElementById('demo-cursor'); if (c) { c.style.left = x + 'px'; c.style.top = y + 'px'; } }, [x, y]);
      await page.mouse.move(x, y, { steps: 8 }); cx = x; cy = y;
      await page.waitForTimeout(500);
    },
    async click(locator, { pause = 350, force = false } = {}) {
      if (!force) await locator.scrollIntoViewIfNeeded();
      const b = await locator.boundingBox();
      await d.moveTo(b.x + b.width / 2, b.y + b.height / 2);
      await page.evaluate(([x, y]) => { const r = document.createElement('div'); r.className = 'demo-ripple';
        r.style.left = x + 'px'; r.style.top = y + 'px'; document.body.appendChild(r); setTimeout(() => r.remove(), 700); }, [cx, cy]);
      await locator.click({ force });
      await page.waitForTimeout(pause);
    },
    async type(locator, text, delay = 55) {
      await d.click(locator);
      await locator.pressSequentially(text, { delay });
    },
    // Smooth scroll so the GIF reads as motion, not a jump.
    async scrollBy(dy, ms = 900) {
      await page.evaluate(([dy, ms]) => new Promise(res => {
        const start = scrollY, t0 = performance.now();
        const step = t => { const k = Math.min(1, (t - t0) / ms); const e = k < .5 ? 2*k*k : 1 - (-2*k+2)**2/2;
          scrollTo(0, start + dy * e); k < 1 ? requestAnimationFrame(step) : res(); };
        requestAnimationFrame(step); }), [dy, ms]);
      await page.waitForTimeout(250);
    },
    async scrollToEl(locator, offset = 120, ms = 900) {
      const y = await locator.evaluate(el => el.getBoundingClientRect().top);
      await d.scrollBy(y - offset, ms);
    },
    // Anything inside fn is sped up in the final GIF (e.g. waiting on a model call).
    async fastForward(fn, speed = 10) {
      const a = (Date.now() - t0) / 1000; await fn(); const b = (Date.now() - t0) / 1000;
      spans.push({ start: a, end: b, speed });
    },
  };

  let ok = true;
  try { await fn(d); } catch (e) { ok = false; console.error(`!! ${name}:`, e.message.split('\n')[0]); await page.screenshot({ path: `raw/${name}-error.png` }); }
  const video = page.video();
  await context.close(); await browser.close();
  const src = await video.path();
  renameSync(src, `raw/${name}.webm`); rmSync(`raw/${name}-tmp`, { recursive: true, force: true });
  writeFileSync(`raw/${name}.json`, JSON.stringify({ name, startAt, spans, duration: (Date.now() - t0) / 1000 }, null, 2));
  console.log(`${ok ? 'recorded' : 'FAILED'} ${name}`);
  return ok;
}
