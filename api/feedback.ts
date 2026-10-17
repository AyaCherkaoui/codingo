// Vercel serverless function: turns app feedback into an issue in a PRIVATE GitHub repo.
// Env (Vercel project settings): GITHUB_TOKEN (fine-grained, Issues + Contents: read/write on that repo only),
// FEEDBACK_REPO ("owner/name" of the private repo).
const MAX_IMAGE_B64 = 3_400_000; // ~2.5 MB image, under Vercel's 4.5 MB body limit

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: any, res: any) {
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const token = process.env.GITHUB_TOKEN, repo = process.env.FEEDBACK_REPO;
  if (!token || !repo) return res.status(503).json({ error: 'Feedback is not set up yet.' });

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  const message = String(b.message ?? '').trim().slice(0, 4000);
  if (message.length < 3) return res.status(400).json({ error: 'Please write a few words.' });
  const kind = ['bug', 'idea', 'other'].includes(b.kind) ? b.kind : 'other';
  const contact = String(b.contact ?? '').trim().slice(0, 200);
  const app = String(b.app ?? '').slice(0, 200);

  const gh = (path: string, init: any) => fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
  });

  let imageMd = '';
  if (b.image) {
    const img = String(b.image);
    if (img.length > MAX_IMAGE_B64) return res.status(413).json({ error: 'Screenshot is too large (max ~2.5 MB).' });
    const ext = b.mime === 'image/jpeg' ? 'jpg' : b.mime === 'image/webp' ? 'webp' : 'png';
    const path = `feedback/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const up = await gh(`/contents/${path}`, { method: 'PUT', body: JSON.stringify({ message: 'Add feedback screenshot', content: img }) });
    if (up.ok) imageMd = `\n\n![screenshot](https://github.com/${repo}/blob/HEAD/${path}?raw=true)`;
  }

  const title = `[${kind}] ${message.split('\n')[0].slice(0, 70)}`;
  const body = `${message}${imageMd}\n\n---\n**Contact:** ${contact || 'not given'}\n**App:** ${app || 'unknown'}`;
  const r = await gh('/issues', { method: 'POST', body: JSON.stringify({ title, body, labels: ['feedback', kind] }) });
  if (!r.ok) return res.status(502).json({ error: 'Could not send feedback right now.' });
  return res.status(200).json({ ok: true });
}
