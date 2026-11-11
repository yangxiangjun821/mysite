const root = document.documentElement;
try {
  const saved = localStorage.getItem('learning-theme');
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
} catch { /* Browser storage is optional. */ }

// The visible collection is the single source of truth for the random hero.
const quoteCards = [...document.querySelectorAll('[data-quote]')];
let quoteIndex = -1;
function drawQuote() {
  if (!quoteCards.length) return;
  // Select uniformly from all entries except the currently displayed entry.
  let next = Math.floor(Math.random() * (quoteCards.length - (quoteIndex < 0 ? 0 : 1)));
  if (quoteIndex >= 0 && next >= quoteIndex) next += 1;
  quoteIndex = next;
  document.querySelector('#quote-text').textContent = quoteCards[next].querySelector('p').textContent;
  document.querySelector('#quote-author').textContent = '— ' + quoteCards[next].querySelector('cite').textContent;
}
if (quoteCards.length) drawQuote();
document.querySelector('#new-quote')?.addEventListener('click', drawQuote);

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});
const machineSwitch = document.querySelector('#machine-switch');
let busy = false;
machineSwitch?.addEventListener('click', () => {
  if (busy) return;
  busy = true;
  machineSwitch.disabled = true;
  machineSwitch.setAttribute('aria-busy', 'true');
  machineSwitch.setAttribute('aria-pressed', 'true');
  machineSwitch.querySelector('b').textContent = 'ON';
  document.querySelector('.machine').classList.add('working');
  document.querySelector('#machine-status').textContent = 'You switched it on. The machine objects…';
  setTimeout(() => {
    machineSwitch.setAttribute('aria-pressed', 'false');
    machineSwitch.disabled = false;
    machineSwitch.removeAttribute('aria-busy');
    machineSwitch.querySelector('b').textContent = 'OFF';
    document.querySelector('.machine').classList.remove('working');
    document.querySelector('#machine-status').textContent = 'Order restored. Nothing was accomplished.';
    busy = false;
  }, 1800);
});

