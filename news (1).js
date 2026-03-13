const NEWS_KEY = 'e8c6b8eca1774285a1c3dc75b05e7768';

export default async function handler(req, res) {
  // Allow requests from any origin (your Netlify site)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q, from, to, pageSize = 20 } = req.query;

  if (!q || !from || !to) {
    return res.status(400).json({ error: 'Missing required params: q, from, to' });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${from}&to=${to}&language=en&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${NEWS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
