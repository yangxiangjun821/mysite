const header = document.querySelector('#site-header');
async function loadNavigation() {
  try {
    const response = await fetch('nav.html');
    if (!response.ok) throw new Error('Navigation unavailable');
    header.innerHTML = await response.text();
    const current = location.pathname.split('/').pop() || 'index.html';
    header.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
    });
    const menu = header.querySelector('.menu-toggle');
    const navigation = header.querySelector('nav');
    const closeMenu = () => {
      menu.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('open');
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('open', open);
    });
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu(); menu.focus();
      }
    });
    const breakpoint = matchMedia('(min-width: 801px)');
    breakpoint.addEventListener('change', closeMenu);
    const themeButton = header.querySelector('.theme-toggle');
    const updateThemeButton = () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    };
    updateThemeButton();
    themeButton.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem('learning-theme', theme); } catch { /* Theme still works without storage. */ }
      updateThemeButton();
    });
  } catch {
    header.replaceChildren();
    const note = document.createElement('p');
    note.textContent = location.protocol === 'file:'
      ? 'Start a local web server to load the shared navigation. See README.md.'
      : 'Navigation could not load. Check your connection and retry.';
    const retry = document.createElement('button');
    retry.className = 'solid-button'; retry.textContent = 'Retry navigation';
    retry.addEventListener('click', loadNavigation);
    const link = document.createElement('a');
    link.href = 'nav.html'; link.textContent = 'Open navigation links';
    header.append(note, retry, link);
  }
}
if (header) loadNavigation();
