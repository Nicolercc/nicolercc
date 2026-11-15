// One scripted scene per project. Each shows a single engineering decision in action.
// Usage: node scenes.mjs [sala sano ruvia vantage code4kidz]
import { scene } from './lib.mjs';

const scenes = {
  async sala(d) {
    const p = d.page;
    await d.start('https://sala-privacy-board.netlify.app');
    await d.caption('Staff see everything. The waiting-room screen must not.');
    await d.wait(2200);
    await d.scrollToEl(p.getByText('The wall', { exact: true }), 140, 1200);
    await d.caption('The board gets a <b>separate, smaller record</b>. Names aren’t in its contract.');
    await d.moveTo(240, 330); await d.wait(1800);
    await d.click(p.getByRole('button', { name: 'Try to send a name' }), { pause: 600 });
    await d.caption('<b>Blocked.</b> Tests fail if a sensitive field ever reaches the board.');
    await d.wait(3200);
    await d.scrollToEl(p.getByText('Waiting room', { exact: true }), 60, 1200);
    await d.caption('The room sees a symbol, a wait range and a status. Nothing else.');
    await d.wait(3200);
  },

  async sano(d) {
    const p = d.page;
    await d.start('https://sano-nine.vercel.app');
    await d.caption('The grade is on the door. The history behind it isn’t.');
    await d.wait(2000);
    await d.click(p.getByRole('button', { name: 'Lucky Chix' }), { pause: 1200 });
    await d.click(p.locator('a[href="/restaurants/50169790"]').filter({ hasText: 'Open profile' }).first(), { pause: 0 });
    await p.waitForLoadState('networkidle'); await d.overlay(); await d.wait(600);
    await d.caption('Official NYC records stay <b>separate</b> from review context.');
    await d.moveTo(380, 330); await d.wait(1600);
    await d.moveTo(900, 330); await d.wait(1600);
    await d.scrollToEl(p.getByText('The story so far'), 90, 1100);
    await d.caption('A plain-language read of the record, with its limits stated.');
    await d.wait(3000);
  },

  async ruvia(d) {
    const p = d.page;
    await d.start('https://ruvia.vercel.app');
    await d.click(p.getByRole('button', { name: 'Enter review workspace' }), { pause: 800 });
    await d.overlay();
    await p.getByText('Seeded demo only').waitFor({ timeout: 15000 });
    await d.caption('The public demo runs on seeded data, and <b>the badge says so</b>.');
    const badge = await p.locator('.mode-badge').boundingBox();
    await d.moveTo(badge.x + badge.width / 2, badge.y + badge.height / 2);
    await d.wait(2200);
    await d.caption('A job description and three resumes go in.');
    await d.click(p.getByRole('button', { name: 'Load demo job' }), { pause: 500 });
    await d.click(p.getByRole('button', { name: 'Load demo candidates' }), { pause: 500 });
    await d.click(p.getByRole('button', { name: 'Analyze candidates' }), { pause: 0 });
    await d.fastForward(async () => {
      await p.getByText('Review queue').waitFor({ timeout: 120000 });
      await d.wait(800);
    }, 6);
    await d.caption('The score is <b>deterministic code</b>, not a model’s opinion.');
    await d.scrollToEl(p.getByText('EVIDENCE SCORE', { exact: false }).first(), 140, 1100);
    await d.wait(2600);
    await d.scrollToEl(p.getByText('Criterion evidence'), 110, 1100);
    await d.caption('Every criterion is backed by resume evidence, or marked <b>not found</b>.');
    await d.wait(3000);
    await d.caption('A recruiter makes the call. Ruvia never auto-rejects.');
    await d.scrollToEl(p.getByText('RECRUITER STATUS'), 160, 1000);
    await d.wait(2800);
  },

  async vantage(d) {
    const p = d.page;
    await d.start('https://conflict-analysis-vantage.vercel.app');
    await d.caption('Ask about a conflict in the news.');
    await d.click(p.getByRole('button', { name: 'Red Sea shipping tensions' }), { pause: 500 });
    await d.click(p.getByRole('button', { name: 'Run briefing' }), { pause: 1500 });
    await d.overlay();
    await d.caption('It retrieves live coverage, then quotes a source for <b>every claim</b>.');
    await d.wait(2500);
    await d.fastForward(async () => {
      await p.waitForFunction(() => !document.body.innerText.includes('Building your brief'), null, { timeout: 180000 });
      await p.waitForLoadState('networkidle').catch(() => {});
      await d.overlay(); await d.wait(1000);
    }, 12);
    await d.scrollToEl(p.getByRole('heading', { name: 'Key facts' }), 110, 1100);
    await d.caption('Key facts come <b>from retrieved reporting</b>. Click a number to see the quote.');
    await d.wait(1200);
    const cite = p.getByRole('heading', { name: 'Key facts' }).locator('xpath=ancestor::section[1]').getByRole('button').first();
    await d.click(cite, { pause: 2600 });
    await d.scrollToEl(p.getByRole('heading', { name: 'Assessment' }), 110, 1300);
    await d.caption('Anything unsourced is labelled <b>model background</b>, never passed off as reporting.');
    await d.wait(3000);
    await d.scrollToEl(p.getByRole('heading', { name: 'Sources' }), 90, 1500);
    await d.caption('Sources are <b>retrieved, not written</b> by the model.');
    await d.wait(3000);
  },

  async code4kidz(d) {
    const p = d.page;
    await d.start('https://code4kidz-six.vercel.app');
    const f = { force: true };
    await d.caption('Kids pick a topic and build a real webpage about it.');
    await d.click(p.getByRole('button', { name: /Start Learning Free!/ }), { pause: 1000 });
    await d.fastForward(async () => {
      await d.click(p.getByRole('button', { name: /Continue/ }), { pause: 800, ...f });
      await d.click(p.getByRole('button', { name: 'Space' }), { pause: 600 });
      await d.click(p.getByText(/build my Space page/i), { pause: 1800, ...f });
      await d.click(p.getByRole('button', { name: /NEXT/ }), { pause: 1200, ...f });
      await d.click(p.getByRole('button', { name: /START LESSON 1/ }), { pause: 1500, ...f });
      await d.moveTo(560, 292); await p.mouse.click(560, 292); await d.wait(1500);
      await d.click(p.getByRole('button', { name: /Continue/ }), { pause: 1500, ...f });
    }, 5);
    await d.overlay();
    const editor = p.locator('.cm-content').first();
    await d.caption('Byte checks the actual code. A near-miss <b>doesn’t pass</b>.');
    await d.click(editor, { pause: 200 });
    await p.keyboard.type('<htm>', { delay: 90 });
    await d.wait(500);
    await d.click(p.getByRole('button', { name: 'Check my code' }), { pause: 2600 });
    await p.screenshot({ path: 'raw/c4k-wrong.png' });
    await d.click(editor, { pause: 100 });
    await p.keyboard.press('ControlOrMeta+a'); await p.keyboard.press('Backspace');
    await p.keyboard.type('<html>', { delay: 90 });
    await d.wait(400);
    await d.caption('The right answer passes, and the lesson moves on.');
    await d.click(p.getByRole('button', { name: 'Check my code' }), { pause: 2800 });
    await p.screenshot({ path: 'raw/c4k-right.png' });
    await d.caption('<b>0 axe accessibility violations</b>, enforced in CI.');
    await d.wait(2600);
  },
};

const pick = process.argv.slice(2);
for (const name of (pick.length ? pick : Object.keys(scenes))) await scene(name, scenes[name]);
