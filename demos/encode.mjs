// Turns raw/<name>.webm + raw/<name>.json into out/<name>.mp4 and out/<name>.gif.
// Cuts everything before the first page load and speeds up fast-forward spans.
// Usage: node encode.mjs [names...]   (needs ffmpeg + gifski)
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, mkdirSync, rmSync, statSync } from 'node:fs';

const FPS = 15, GIF_FPS = 12, GIF_WIDTH = 720, QUALITY = 75;
mkdirSync('out', { recursive: true });
const run = (cmd, args) => execFileSync(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });

const names = process.argv.slice(2).length ? process.argv.slice(2)
  : readdirSync('raw').filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));

for (const name of names) {
  const { startAt, spans, duration } = JSON.parse(readFileSync(`raw/${name}.json`, 'utf8'));
  // Build [start, end, speed] segments covering startAt..duration.
  const segs = []; let cur = startAt;
  for (const s of spans.filter(s => s.end > startAt).sort((a, b) => a.start - b.start)) {
    if (s.start > cur) segs.push([cur, s.start, 1]);
    segs.push([Math.max(s.start, cur), s.end, s.speed]); cur = s.end;
  }
  segs.push([cur, duration, 1]);

  const parts = segs.map(([a, b, k], i) =>
    `[0:v]trim=start=${a.toFixed(3)}:end=${b.toFixed(3)},setpts=(PTS-STARTPTS)/${k}[v${i}]`);
  const filter = `${parts.join(';')};${segs.map((_, i) => `[v${i}]`).join('')}concat=n=${segs.length}:v=1:a=0,` +
    `fps=${FPS},tpad=stop_mode=clone:stop_duration=1.2[out]`;

  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', `raw/${name}.webm`, '-filter_complex', filter, '-map', '[out]',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'slow', '-movflags', '+faststart', `out/${name}.mp4`]);

  const frames = `out/.frames-${name}`;
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames);
  run('ffmpeg', ['-loglevel', 'error', '-i', `out/${name}.mp4`, '-vf', `fps=${GIF_FPS},scale=${GIF_WIDTH}:-1:flags=lanczos`, `${frames}/f%04d.png`]);
  const pngs = readdirSync(frames).sort().map(f => `${frames}/${f}`);
  run('gifski', ['--fps', String(GIF_FPS), '--quality', String(QUALITY), '-o', `out/${name}.gif`, ...pngs]);
  rmSync(frames, { recursive: true, force: true });

  const mb = f => (statSync(f).size / 1e6).toFixed(1) + 'MB';
  const secs = segs.reduce((t, [a, b, k]) => t + (b - a) / k, 0) + 1.2;
  console.log(`${name}: ${secs.toFixed(1)}s · gif ${mb(`out/${name}.gif`)} · mp4 ${mb(`out/${name}.mp4`)}`);
}
