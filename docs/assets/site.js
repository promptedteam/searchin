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
  function expandInPage(video, trigger) {
    const dialog = document.createElement('dialog');
    dialog.className = 'video-theater';
    dialog.setAttribute('aria-label', 'Expanded tutorial video');
    const placeholder = document.createElement('div');
    placeholder.className = 'video-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = 'Close expanded video';
    closeButton.className = 'theater-close';
    const wasPlaying = !video.paused;
    video.before(placeholder);
    dialog.append(closeButton, video);
    document.body.append(dialog);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      const resume = !video.paused;
      placeholder.replaceWith(video);
      dialog.remove();
      document.body.style.overflow = previousOverflow;
      if (resume) video.play().catch(() => {});
      trigger.focus();
    }, { once: true });
    dialog.showModal();
    closeButton.focus();
    if (wasPlaying) video.play().catch(() => {});
  }
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(other => { if (other !== video) other.pause(); });
    });
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'fullscreen-button';
    button.textContent = 'Full screen';
    button.setAttribute('aria-label', `View ${video.getAttribute('aria-label')} in full screen`);
    button.addEventListener('click', async () => {
      try {
        if (video.requestFullscreen) await video.requestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
        else expandInPage(video, button);
      } catch { expandInPage(video, button); }
    });
    video.closest('article')?.querySelector('.card-foot > span:last-child')?.replaceWith(button);
  });
  document.querySelectorAll('[data-seek]').forEach(button => button.addEventListener('click', () => {
    const video = button.closest('article')?.querySelector('video');
    if (!video) return;
    const time = Number(button.dataset.seek);
    const seek = () => { video.currentTime = time; video.play().catch(() => { video.focus(); }); };
    if (video.readyState >= 1) seek();
    else { video.addEventListener('loadedmetadata', seek, { once: true }); video.load(); }
    video.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  }));
  const sidebar = document.querySelector('#section-sidebar');
  const toggle = document.querySelector('[data-menu-toggle]');
  const backdrop = document.querySelector('[data-menu-backdrop]');
  const close = document.querySelector('[data-menu-close]');
  const main = document.querySelector('main');
  const groupButtons = [...document.querySelectorAll('[data-menu-group]')];
  const groups = [...document.querySelectorAll('.nav-group[data-group]')];
  let returnFocus;
  let currentSectionGroup = 'explore';
  let selectedGroup = 'explore';
  function updateRail(group) {
    groupButtons.forEach(button => {
      button.classList.toggle('is-active', button.dataset.menuGroup === group);
      button.setAttribute('aria-expanded', String(document.body.classList.contains('nav-open') && button.dataset.menuGroup === group));
    });
  }
  function setMenu(expanded, restoreFocus = true, trigger) {
    document.body.classList.toggle('nav-open', expanded);
    toggle?.setAttribute('aria-expanded', String(expanded));
    toggle?.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    if (backdrop) backdrop.hidden = !expanded;
    if (main) main.inert = expanded;
    if (sidebar) {
      sidebar.inert = !expanded;
      if (expanded) {
        sidebar.setAttribute('role', 'dialog');
        sidebar.setAttribute('aria-modal', 'true');
        returnFocus = trigger || document.activeElement;
        requestAnimationFrame(() => {
          if (!document.body.classList.contains('nav-open')) return;
          const target = trigger?.hasAttribute('data-menu-group')
            ? groups.find(group => group.dataset.group === selectedGroup)?.querySelector('summary')
            : close;
          target?.focus();
        });
      } else {
        sidebar.removeAttribute('role');
        sidebar.removeAttribute('aria-modal');
        if (restoreFocus && returnFocus) returnFocus.focus();
      }
    }
    updateRail(expanded ? selectedGroup : currentSectionGroup);
  }
  function openGroup(name, trigger) {
    selectedGroup = name;
    groups.forEach(group => { group.open = group.dataset.group === name; });
    setMenu(true, true, trigger);
  }
  toggle?.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) setMenu(false);
    else openGroup(currentSectionGroup, toggle);
  });
  groupButtons.forEach(button => button.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open') && selectedGroup === button.dataset.menuGroup) setMenu(false);
    else openGroup(button.dataset.menuGroup, button);
  }));
  close?.addEventListener('click', () => setMenu(false));
  backdrop?.addEventListener('click', () => setMenu(false));
  sidebar?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false, false);
    const target = link.hash ? document.getElementById(decodeURIComponent(link.hash.slice(1))) : null;
    if (target) {
      target.setAttribute('tabindex', '-1');
      if (target.tagName === 'DETAILS') target.open = true;
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
    }
  }));
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
    if (event.key === 'Tab') {
      const items = [...sidebar.querySelectorAll('a[href], button, summary')].filter(item => item.getClientRects().length);
      const first = items[0];
      const last = items.at(-1);
      if (!sidebar.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('[data-section]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const active = link.dataset.section === entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
          if (active) currentSectionGroup = link.closest('[data-group]')?.dataset.group || 'explore';
        });
        if (!document.body.classList.contains('nav-open')) updateRail(currentSectionGroup);
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
