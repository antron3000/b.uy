// b.uy Worker: API routes first, static assets for everything else.
import { handleApi } from './api.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api' || url.pathname.startsWith('/api/') || url.pathname.startsWith('/.well-known/') || url.pathname === '/buy' || url.pathname.startsWith('/buy/')) {
      return handleApi(request, env, ctx, url);
    }
    return env.ASSETS.fetch(request);
  },
};
