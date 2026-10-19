(() => {
  'use strict';
  const root = document.documentElement;
  const deviceTheme = matchMedia('(prefers-color-scheme: dark)');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : deviceTheme.matches;
  const syncThemeLabel = () => {
    if (!themeButton) return;
    const label = `Switch to ${isDark() ? 'light' : 'dark'} theme`;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
  };
  syncThemeLabel();
  deviceTheme.addEventListener('change', syncThemeLabel);
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('searchin-site-theme', root.dataset.theme); } catch { /* Optional preference. */ }
    syncThemeLabel();
  });
  const shots = {
    infile: { file: '04-in-file-and-preview', alt: 'SEARCH-IN finding indexed document text, with matching text and a PDF preview side by side.', caption: 'Find the words inside your documents. Preview the match right beside the result.' },
    files: { file: '03-files-and-folders', alt: 'SEARCH-IN Files mode searching synthetic filenames and folders.', caption: 'Narrow by filename, extension, or folder. Take a look before opening the file.' },
    index: { file: '02-first-index-and-ai', alt: 'The SEARCH-IN Content Indexer preparing text from a fictional demo folder.', caption: 'Choose your scope, extract text locally, and review which files still need AI OCR.' }
  };
  const shotButtons = [...document.querySelectorAll('[data-shot]')];
  function selectShot(button) {
    const shot = shots[button.dataset.shot];
    if (!shot) return;
    for (const item of shotButtons) {
      item.setAttribute('aria-selected', String(item === button));
      item.tabIndex = item === button ? 0 : -1;
    }
    const image = document.querySelector('#app-shot');
    image.src = `tutorials/posters/${shot.file}.jpg`;
    image.alt = shot.alt;
    document.querySelector('#app-shot-caption').textContent = shot.caption;
    document.querySelector('#app-shot-panel').setAttribute('aria-labelledby', button.id);
  }
  shotButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectShot(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % shotButtons.length;
      if (event.key === 'ArrowLeft') next = (index + shotButtons.length - 1) % shotButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = shotButtons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      shotButtons[next].focus();
      selectShot(shotButtons[next]);
    });
  });
  const filters = [...document.querySelectorAll('[data-filter]')];
  const formatCards = [...document.querySelectorAll('[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
      item.classList.toggle('is-active', item === button);
    });
    formatCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
    const count = formatCards.filter(card => !card.hidden).length;
    document.querySelector('#format-status').textContent = `Showing ${count} preview categories: ${button.textContent}.`;
  }));
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(video => video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
  }));
  document.querySelectorAll('[data-seek]').forEach(button => button.addEventListener('click', () => {
    const video = button.closest('article')?.querySelector('video');
    if (!video) return;
    const time = Number(button.dataset.seek);
    const seek = () => { video.currentTime = time; video.play().catch(() => { video.focus(); }); };
    if (video.readyState >= 1) seek();
    else { video.addEventListener('loadedmetadata', seek, { once: true }); video.load(); }
    video.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  }));
  const menu = document.querySelector('.mobile-menu');
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('[data-section]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('is-active', link.dataset.section === entry.target.id));
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
