// GET /buy/btc?amount=&currency=&address= -> validate, pick the provider, record, redirect.
import { transakReady, transakUrl } from './providers/transak.js';

const BTC = /^(bc1[qp][a-z0-9]{38,87}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/;
const FIAT = new Set(['CAD', 'USD', 'EUR', 'GBP']);
const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } });
const ref = () => 'ord_' + Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');

export function providersStatus(env) {
  const ready = transakReady(env);
  return json({
    ready,
    providers: [{ id: 'transak', asset: 'BTC', ready, env: env.TRANSAK_ENV || 'staging', methods: ['card', 'apple_pay', 'google_pay', 'bank'] }],
    message: ready ? undefined : 'Buying is not live yet. The first provider key is being set up.',
  });
}

export async function buyBtc(request, env, url) {
  const amount = Number(url.searchParams.get('amount'));
  const currency = String(url.searchParams.get('currency') || 'USD').toUpperCase();
  const address = String(url.searchParams.get('address') || '').trim();
  const wantsJson = (request.headers.get('accept') || '').includes('application/json') || url.searchParams.get('format') === 'json';

  if (!Number.isFinite(amount) || amount < 20 || amount > 20000) return json({ error: 'invalid_amount', message: 'amount must be between 20 and 20000' }, 400);
  if (!FIAT.has(currency)) return json({ error: 'invalid_currency', message: `currency must be one of ${[...FIAT].join(', ')}` }, 400);
  if (!BTC.test(address)) return json({ error: 'invalid_address', message: 'address must be a mainnet bitcoin address (bc1…, 1…, or 3…)' }, 400);
  if (!transakReady(env)) return json({ error: 'not_ready', message: 'No provider is configured yet.' }, 503);

  const reference = ref();
  const origin = env.SITE_ORIGIN || url.origin;
  const handoff = transakUrl(env, { amount, currency, address, reference, origin });
  const order = { reference, provider: 'transak', asset: 'BTC', amount, currency, address, created: new Date().toISOString(), status: 'handed_off' };
  console.log('order', JSON.stringify(order));
  if (env.ORDERS) await env.ORDERS.put(`order:${reference}`, JSON.stringify(order), { expirationTtl: 60 * 60 * 24 * 90 });

  if (wantsJson) return json({ ...order, handoff_url: handoff });
  return Response.redirect(handoff, 302);
}
