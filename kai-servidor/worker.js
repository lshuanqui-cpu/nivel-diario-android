// Kai · servidor puente entre la app y la API de Claude (Cloudflare Worker)
// Variables en Cloudflare: ANTHROPIC_API_KEY (secreta), APP_TOKEN (secreta), MODEL (opcional)
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-App-Token'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return new Response('Kai está en línea', { headers: cors });
    if (env.APP_TOKEN && req.headers.get('X-App-Token') !== env.APP_TOKEN) {
      return Response.json({ error: 'Contraseña incorrecta' }, { status: 401, headers: cors });
    }
    let body;
    try { body = await req.json(); } catch (e) { return Response.json({ error: 'JSON inválido' }, { status: 400, headers: cors }); }
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: env.MODEL || 'claude-haiku-4-5',
        max_tokens: Math.min(body.max_tokens || 300, 600),
        system: body.system,
        messages: (body.messages || []).slice(-10)
      })
    });
    const data = await r.json();
    const text = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
    return Response.json({ text, error: data.error ? data.error.message : undefined }, { status: r.ok ? 200 : 500, headers: cors });
  }
};
