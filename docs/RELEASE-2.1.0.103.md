# SEARCH-IN 2.1.0.103

First public SEARCH-IN release in the existing promptedteam/LOCALOCR distribution repository.

- Enables the SEARCH-IN HTTPS update channel, with a release-hosted manifest and a default-branch fallback.
- Keeps the legacy LOCALOCR 1.x update channel separate rather than implying an untested in-place product migration.
- Retains Word/RTF preview corrections, WebView2 prerequisite detection, responsive paged results, persistent encrypted API settings, multi-key rotation, and automatic rate-limit waiting.
- Adds four one-minute tutorials with a two-column desktop gallery and a two-by-two README tutorial section.
- Retains release/download/Windows/x64 badges, direct package links, release notes, and the live GitHub star badge.

Earlier local SEARCH-IN builds intentionally disabled online update checks. Install this Setup once to enable future in-app updates. Existing SEARCH-IN configuration, encrypted keys, bookmarks, and indexes keep their current locations. LOCALOCR 1.x remains installed separately; its settings and indexes are not deleted or silently converted.

The installer requires .NET 10 Desktop Runtime (x64) and Microsoft Edge WebView2 Runtime. It can obtain missing prerequisites from Microsoft with internet access. For offline PCs, bring the official standalone prerequisite installers first. Word layout remains approximate; some media and specialist formats depend on codecs or supported subsets.
