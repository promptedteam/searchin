(() => {
  const chapters = new Set(['#01-installation-walkthrough', '#02-first-index-and-ai', '#03-files-and-folders', '#04-in-file-and-preview']);
  const target = chapters.has(location.hash) ? location.hash : '#guides';
  location.replace(new URL(`../${target}`, location.href));
})();
