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
  machineSwitch.setAttribute('aria-disabled', 'true');
  machineSwitch.setAttribute('aria-pressed', 'true');
  machineSwitch.querySelector('b').textContent = 'ON';
  document.querySelector('.machine').classList.add('working');
  document.querySelector('#machine-status').textContent = 'You switched it on. The machine objects…';
  setTimeout(() => {
    machineSwitch.setAttribute('aria-pressed', 'false');
    machineSwitch.setAttribute('aria-disabled', 'false');
    machineSwitch.querySelector('b').textContent = 'OFF';
    document.querySelector('.machine').classList.remove('working');
    document.querySelector('#machine-status').textContent = 'Order restored. Nothing was accomplished.';
    busy = false;
  }, 1800);
});

document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const message = form.elements.message.value.trim();
  if (!name || !message) {
    document.querySelector('#form-note').textContent = 'Please enter a name and a message, not just spaces.';
    (!name ? form.elements.name : form.elements.message).focus();
    return;
  }
  const blob = new Blob(['Learning Studio feedback\n\nFrom: ' + name + '\n\n' + message + '\n'], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'learning-studio-feedback.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-note').textContent = 'Your draft download has started. Share the file yourself when you are ready; nothing has been sent.';
});
