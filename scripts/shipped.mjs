// Rewrites the "Recently shipped" table in README.md: my latest merged public pull request in each repo.
// Runs daily in .github/workflows/shipped.yml; the workflow commits only when the list changes.
// Usage: GITHUB_TOKEN=... node scripts/shipped.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const USER = 'Nicolercc', COUNT = 6, SKIP = ['ruvia', 'Sala'], START = '<!-- shipped:start -->', END = '<!-- shipped:end -->';
const q = encodeURIComponent(`is:pr is:merged is:public author:${USER} -repo:${USER}/${USER.toLowerCase()}`);
const res = await fetch(`https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=100`, {
  headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'profile-readme',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
});
if (!res.ok) throw new Error(`GitHub search failed: ${res.status} ${await res.text()}`);
const { items } = await res.json();

const esc = s => s.replace(/([\\`*_[\]<>|])/g, '\\$1');
const lines = items
  .filter(i => i.pull_request?.merged_at && !SKIP.includes(i.repository_url.split('/').pop()))
  .sort((a, b) => b.pull_request.merged_at.localeCompare(a.pull_request.merged_at))
  .filter((i, n, all) => all.findIndex(j => j.repository_url === i.repository_url) === n)
  .slice(0, COUNT)
  .map(i => {
    const repo = i.repository_url.split('/repos/')[1];
    const name = repo.startsWith(`${USER}/`) ? repo.split('/')[1] : repo;
    return `| ${i.pull_request.merged_at.slice(0, 10)} | [${esc(name)}](https://github.com/${repo}) | [${esc(i.title)}](${i.html_url}) |`;
  });
if (!lines.length) throw new Error('No merged pull requests found; leaving README untouched.');

const table = ['| Merged | Repo | Change |', '|---|---|---|', ...lines].join('\n');
const readme = readFileSync('README.md', 'utf8');
const a = readme.indexOf(START), b = readme.indexOf(END);
if (a < 0 || b < a) throw new Error('shipped markers missing from README.md');
const next = `${readme.slice(0, a + START.length)}\n${table}\n${readme.slice(b)}`;
if (next !== readme) { writeFileSync('README.md', next); console.log('README updated'); } else console.log('no change');
