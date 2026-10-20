# SEARCH-IN 2.1.0.104

## Result Sorting Fixes

- The sort arrow now updates with the actual result order, not before it is ready.
- Changing the sort shows its first result page while retaining virtual scrolling for the complete result set.
- Path sorting follows the displayed directory. Ext sorting treats folders as having no extension.
- Modified sorting retains full timestamp precision. Size and Modified result pages keep their sorting values consistent.
- Reversing the current sort reuses the existing ordered result snapshot when the catalog has not changed.
- A failed search or sort keeps the previous results and paging available, with a visible error message.

The first Size or Modified sort on a large catalog can still take longer because filesystem metadata must be read. This is not a claim of instant metadata sorting across millions of files.

## Updating

SEARCH-IN 2.1.0.103 and later can detect this release through the quiet **New update** download indicator. Click it to review the update, download inside the app, verify the package, and choose when to run Setup. Nothing installs automatically.

Earlier local builds, including 2.1.0.102, disabled online update checks. They need a one-time manual installation of a build with updates enabled. To test the update indicator specifically, install 2.1.0.103 and reopen it to detect 2.1.0.104.

Setup updates both SEARCH-IN and its included engine. Existing configuration, encrypted API keys, bookmarks, and content indexes keep their current locations. LOCALOCR 1.x remains separate and its compatible update feed is unchanged.

Requires Windows 10/11 x64, Microsoft .NET 10 Desktop Runtime, and Microsoft Edge WebView2 Runtime. Packages are unsigned; verify their origin and SHA-256 before installing. Application source and personal data are not included.
