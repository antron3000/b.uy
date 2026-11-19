// Address-bar typing loop: type a word after b.uy/, pause, backspace it, type the next.
const el = document.getElementById('typed');
const WORDS = ['bitcoin', 'shoes', 'houses', 'anything'];
const TYPE_MS = 110, ERASE_MS = 60, HOLD_MS = 1500, GAP_MS = 350;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (ms) => ms * (0.7 + Math.random() * 0.6);

async function run() {
  let i = 0;
  await sleep(HOLD_MS); // the page loads with "bitcoin" already typed
  for (;;) {
    const caret = el.nextElementSibling;
    caret.classList.add('busy');
    for (let n = el.textContent.length; n > 0; n--) { el.textContent = el.textContent.slice(0, -1); await sleep(ERASE_MS); }
    await sleep(GAP_MS);
    i = (i + 1) % WORDS.length;
    for (const ch of WORDS[i]) { el.textContent += ch; await sleep(jitter(TYPE_MS)); }
    caret.classList.remove('busy');
    await sleep(HOLD_MS);
  }
}

if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) run();
else if (el) el.textContent = 'anything';
