(() => {
  try {
    const saved = localStorage.getItem('searchin-site-theme');
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  } catch {
    // Storage is optional; the device theme remains the fallback.
  }
})();
