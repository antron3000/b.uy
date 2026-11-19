// API surface. /buy/btc is the first live route: validate, hand off to a provider, redirect.
import { buyBtc, providersStatus } from './buy.js';
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', ...headers },
  });

export async function handleApi(request, env, ctx, url) {
  const { pathname } = url;
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type,authorization,x-api-key' } });
  }
  if (pathname === '/buy/btc') {
    return buyBtc(request, env, url);
  }
  if (pathname === '/api/providers') {
    return providersStatus(env);
  }
  if (pathname === '/api/health') {
    return json({ ok: true, service: 'b.uy', version: '0.1.0', time: new Date().toISOString() });
  }
  if (pathname === '/.well-known/ucp') {
    // Placeholder UCP profile so agents can discover us. Filled in with real handlers in v1.
    return json({ ucp: { version: '2026-04-08', service: 'b.uy', status: 'pre-launch', docs: `${env.SITE_ORIGIN}/api` } });
  }
  if (pathname === '/api' || pathname === '/api/') {
    return json({
      service: 'b.uy',
      tagline: 'Buy anything. Pay any way.',
      status: 'pre-launch',
      endpoints: { buy_btc: 'GET /buy/btc?amount=100&currency=CAD&address=bc1q… (302 to provider; add format=json for the handoff URL)', providers: '/api/providers', health: '/api/health', ucp: '/.well-known/ucp' },
    });
  }
  return json({ error: 'not_found', path: pathname }, 404);
}
