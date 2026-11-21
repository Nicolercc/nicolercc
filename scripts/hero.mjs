// Renders the animated profile banner in light and dark: assets/hero-light.svg, assets/hero-dark.svg.
// The diagram is the pattern every project follows: sources in, the model proposes,
// deterministic checks decide, and anything unsupported goes to a person instead of the screen.
// Usage: node scripts/hero.mjs
import { writeFileSync } from 'node:fs';

const themes = {
  light: { bg: '#FAF8F4', ink: '#16181D', muted: '#5B616E', faint: '#D9D4CB', box: '#FFFFFF',
    accent: '#9B2C43', pass: '#23855A', hold: '#B26B00', dot: '#16181D', grid: '#EFEBE3' },
  dark: { bg: '#0D1117', ink: '#F0F3F6', muted: '#9AA4B2', faint: '#30363D', box: '#161B22',
    accent: '#F28BA1', pass: '#4FD18B', hold: '#F2B154', dot: '#F0F3F6', grid: '#141A22' },
};

const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Claim paths: straight through the model to the gate, then up to "shown" or down to "review".
const Y = 196, GATE = 1062;
const PASS = `M 742 ${Y} H ${GATE} L 1112 ${Y - 62} H 1150`;
const HOLD = `M 742 ${Y} H ${GATE} L 1112 ${Y + 62} H 1150`;
const len = (dx, dy) => Math.hypot(dx, dy);
const total = (GATE - 742) + len(50, 62) + 38;
const atGate = ((GATE - 742) / total).toFixed(3);

function dot(t, path, color, begin) {
  return `<circle r="6.5" fill="${t.dot}" opacity="0">
    <animateMotion dur="5.4s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>
    <animate attributeName="fill" dur="5.4s" begin="${begin}s" repeatCount="indefinite"
      values="${t.dot};${t.dot};${color};${color}" keyTimes="0;${atGate};${(+atGate + 0.02).toFixed(3)};1"/>
    <animate attributeName="opacity" dur="5.4s" begin="${begin}s" repeatCount="indefinite"
      values="0;1;1;0;0" keyTimes="0;0.06;0.9;0.97;1"/>
  </circle>`;
}

function box(t, x, w, label, sub, opts = {}) {
  const y = opts.y ?? Y - 34, h = 68, color = opts.color ?? t.ink;
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${t.box}" stroke="${opts.stroke ?? t.faint}" stroke-width="1.5"/>
    <text x="${x + w / 2}" y="${y + 29}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" letter-spacing="1.4" fill="${color}">${label}</text>
    <text x="${x + w / 2}" y="${y + 50}" text-anchor="middle" font-family="${SANS}" font-size="12.5" fill="${t.muted}">${sub}</text>
  </g>`;
}

function render(t) {
  const grid = Array.from({ length: 23 }, (_, i) => `<line x1="${i * 56 + 20}" y1="0" x2="${i * 56 + 20}" y2="400" stroke="${t.grid}" stroke-width="1"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 400" width="1280" height="400" role="img"
  aria-labelledby="title desc">
  <title id="title">Nicole Rodriguez: I build AI products that show their evidence.</title>
  <desc id="desc">Animated diagram. Claims flow from sources through a model to a deterministic check. Supported claims are shown with their source; unsupported ones are held for human review.</desc>
  <defs>
    <clipPath id="card"><rect width="1280" height="400" rx="18"/></clipPath>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${t.faint}"/>
    </marker>
  </defs>
  <g clip-path="url(#card)">
    <rect width="1280" height="400" fill="${t.bg}"/>
    <g opacity="0.9">${grid}</g>

    <!-- Left: who and what -->
    <circle cx="72" cy="84" r="5" fill="${t.accent}">
      <animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite"/>
    </circle>
    <text x="88" y="89" font-family="${MONO}" font-size="14" font-weight="600" letter-spacing="2.6" fill="${t.accent}">NICOLE RODRIGUEZ · NEW YORK</text>
    <text font-family="${SERIF}" font-size="54" fill="${t.ink}" letter-spacing="-1">
      <tspan x="64" y="168">AI products that</tspan>
      <tspan x="64" y="232" font-style="italic">show their evidence.</tspan>
    </text>
    <text font-family="${SANS}" font-size="19" fill="${t.muted}">
      <tspan x="66" y="288">Full-stack engineer. The model proposes, code checks,</tspan>
      <tspan x="66" y="316">and a person decides anything the code can't prove.</tspan>
    </text>
    <text x="66" y="358" font-family="${MONO}" font-size="13" letter-spacing="0.2" fill="${t.muted}">TypeScript · React · Python · FastAPI · Postgres · Claude</text>

    <!-- Right: the pattern, animated -->
    <text x="676" y="78" font-family="${MONO}" font-size="12" font-weight="600" letter-spacing="2.2" fill="${t.muted}">EVERY AI FEATURE I SHIP</text>
    <path d="M 808 ${Y} H 852" stroke="${t.faint}" stroke-width="2" marker-end="url(#arrow)"/>
    <path d="M 992 ${Y} H 1024" stroke="${t.faint}" stroke-width="2" marker-end="url(#arrow)"/>
    <path d="M ${GATE + 30} ${Y - 14} L 1112 ${Y - 52}" stroke="${t.faint}" stroke-width="2" marker-end="url(#arrow)"/>
    <path d="M ${GATE + 30} ${Y + 14} L 1112 ${Y + 52}" stroke="${t.faint}" stroke-width="2" marker-end="url(#arrow)"/>

    ${dot(t, PASS, t.pass, 0)}
    ${dot(t, PASS, t.pass, 1.8)}
    ${dot(t, HOLD, t.hold, 3.6)}

    ${box(t, 676, 132, 'SOURCES', 'news · resumes · records')}
    ${box(t, 856, 136, 'MODEL', 'proposes claims')}
    <g>
      <rect x="${GATE - 30}" y="${Y - 30}" width="60" height="60" rx="8" transform="rotate(45 ${GATE} ${Y})" fill="${t.box}" stroke="${t.ink}" stroke-width="1.8"/>
      <text x="${GATE}" y="${Y + 5}" text-anchor="middle" font-family="${MONO}" font-size="12.5" font-weight="700" letter-spacing="1" fill="${t.ink}">CHECK</text>
      <text x="${GATE}" y="${Y + 66}" text-anchor="middle" font-family="${SANS}" font-size="12" fill="${t.muted}">deterministic</text>
    </g>
    ${box(t, 1116, 132, 'SHOWN', 'with its source [1]', { y: Y - 96, color: t.pass, stroke: t.pass })}
    ${box(t, 1116, 132, 'HELD', 'for human review', { y: Y + 28, color: t.hold, stroke: t.hold })}

    <text x="676" y="358" font-family="${SANS}" font-size="13.5" fill="${t.muted}">In Vantage and jt, the model never gets the last word.</text>
  </g>
</svg>
`;
}

for (const [name, t] of Object.entries(themes)) writeFileSync(`assets/hero-${name}.svg`, render(t));
console.log('wrote assets/hero-light.svg, assets/hero-dark.svg');
