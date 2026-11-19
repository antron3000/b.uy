// Client-side sanity checks only. The Worker validates again and builds the provider handoff.
const form = document.getElementById('buy-form');
const note = document.getElementById('buy-note');
const btn = document.getElementById('buy-btn');
const BTC = /^(bc1[qp][a-z0-9]{38,87}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/;

fetch('/api/providers').then(r => r.json()).then(j => {
  if (!j.ready) { btn.disabled = true; note.textContent = j.message || 'Buying is not live yet.'; }
}).catch(() => {});

form?.addEventListener('submit', (e) => {
  const addr = form.address.value.trim();
  if (!BTC.test(addr)) { e.preventDefault(); note.textContent = 'That does not look like a bitcoin address. Use a bc1…, 1…, or 3… address from your own wallet.'; form.address.focus(); return; }
  if (Number(form.amount.value) < 20) { e.preventDefault(); note.textContent = 'Minimum amount is 20.'; return; }
  btn.disabled = true; btn.textContent = 'Taking you to the provider…';
});
