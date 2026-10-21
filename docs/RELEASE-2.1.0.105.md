# SEARCH-IN 2.1.0.105

## Drag Selected Files

Select one or multiple results in **Files** or **In-File**, then drag into File Explorer or another app that accepts Windows file drops. The selection refers to the original files, not preview text or Match snippets.

- Hold **Ctrl** to request Copy, **Shift** to request Move, or **Alt** for a shortcut where the destination supports it. Press **Esc** to cancel.
- Selections can span result pages. Up to 10,000 files or folders can be prepared for one drag.
- Missing or inaccessible items stop preparation instead of silently transferring only part of the selection.
- Run the desktop app normally, not as administrator, when dragging to ordinary Explorer or browser windows. The engine service can keep its existing permissions.
- A destination app must support file drops; not every app or text field accepts files.

## Faster Sorting

Path and Ext sorting are optimized for large catalogs. Size and Modified now share cached metadata, reducing repeated filesystem reads when switching between those columns. Live file changes refresh the affected results.

The first Size/Modified sort across millions of files can still take time. Large result sets remain paged while you scroll.

## Installation And Updates

Use Setup to update both SEARCH-IN and its included engine. Existing SEARCH-IN settings, encrypted API keys, bookmarks, and indexes retain their current locations. No index-format migration is required.

Published builds with update checking enabled show the quiet **New update** download indicator. Click it to review the update, download inside the app, verify SHA-256, and choose when to run Setup. Earlier local builds with updates disabled need one manual installation.

LOCALOCR 1.x stays separate and keeps its compatible update feed. Application source remains private.

**Requirements:** Windows 10/11 x64, .NET 10 Desktop Runtime (x64), and Microsoft Edge WebView2 Runtime. Packages are unsigned; verify the release source and SHA-256 before installing.

Automated checks passed for the engine, header sorting, native file-drop data, controlled copy/move and cancellation, 4,370,750-row scrolling, previews/runtime fallback, and credential persistence/key rotation. No real provider request or personal-file transfer was used for these tests.
