# SEARCH-IN preview coverage

All bundled viewers work locally and are shared by Files and In-File results.
In-File highlighting is available when the rendered content has text; this does
not automatically OCR an image, scanned page, or video. Find is literal text.

The embedded viewer needs Microsoft Edge WebView2 Runtime, separately from
.NET and the Edge browser. Setup 2.1.0.101 detects the runtime and offers an
install/retry page when it is missing. Its Microsoft-signed bootstrapper needs
internet to obtain the runtime. Portable users can install the Evergreen Runtime
from https://developer.microsoft.com/microsoft-edge/webview2/#download.
After that one-time installation, local previews work offline.

If the viewer cannot initialize, a compatibility preview remains available.
The preview header identifies that fallback; hover it for details. Sanitized
diagnostics are in `%LOCALAPPDATA%\SEARCH-IN\Config\preview.log`. A missing
runtime is one possible cause, not proof that another PC has an older build.

| Category | Bundled preview | Important limits |
| --- | --- | --- |
| PDF | PDF.js page rendering, navigation, selection, find | 256 MB; scanned pages need OCR for search |
| Word DOCX/DOCM/DOTX/DOTM | HTML page layout, tables/images, saved page breaks | 32 MB; macros never run; complex Word layout is approximate |
| RTF | Formatted text, fonts/colors, Unicode, embedded pictures where supported | 8 MB; continuous layout, not exact Word pagination; external imports and active links blocked |
| Excel XLSX/XLSM | Stored worksheet values | First 20 sheets, 200 rows, 100 columns; no formulas executed, date/number styles and charts not reproduced |
| PowerPoint PPTX/PPTM | Basic positioned slide text | First 100 slides; advanced drawings, themes, animations not reproduced |
| Images | JPEG, PNG, GIF/APNG animation, WebP, AVIF, BMP, ICO, SVG | Browser decoder dependent; 50-megapixel budget; no SVG scripts |
| Photoshop PSD | Saved composite image | RGB/grayscale 8-bit; no CMYK/LAB/16-bit/PSB or layer editing; 32-megapixel budget |
| Illustrator AI | PDF-compatible saved content through PDF.js | Non-PDF AI variants need an installed preview handler |
| Video/audio | MP4, WebM, MOV, MKV, AVI; MP3, FLAC, WAV, AAC, OGG, M4A | Actual codec/container support depends on Windows/WebView2; up to 2 GB, streamed; no autoplay |
| Code/config/text/subtitles | Syntax highlighting where available, searchable text | Reads at most 2 MB; syntax highlighting up to 256 KB; SRT/ASS/VTT display as text |
| Markdown | Sanitized live rendering | 2 MB; embedded images only; scripts/remote resources blocked |
| Archives | ZIP, RAR, 7z, TAR, GZIP, BZIP2, XZ metadata listing | 64 MB input; first 2,000 entries displayed; no extraction to disk or opening entries |
| Comics | CBZ/CBR embedded images | First 100 image pages / 64 MB expanded / 32 megapixels decoded; PNG/JPEG/GIF/WebP/AVIF pages |
| E-books | EPUB chapter rendering and embedded images | First 100 chapters / 8 MB text / 32 MB images; no DRM; publisher CSS not applied |
| 3D models | OBJ, STL, FBX geometry, orbit/zoom | 64 MB input; two-million-vertex budget; external materials/textures not loaded |
| Sheet music | MusicXML / compressed MXL through OSMD | 10,000-note budget; PDF sheet music uses PDF viewer |
| Fonts | TTF, OTF, WOFF, WOFF2 specimen | Preview only; fonts are not installed |
| Binary | Read-only hex and ASCII for BIN/DLL/EXE/DAT | First 64 KB; executables never run |

## Not Bundled Yet

RAW/HEIC/TIFF codecs, EPS/Ghostscript rendering, MOBI/AZW, and legacy Office file
renderers are not included. SEARCH-IN can still try an installed Windows preview
handler or its original text/image fallback. Availability is machine-dependent.
QuickLook's plugin ecosystem is not automatically available to SEARCH-IN.

## Resource And Safety Limits

OpenXML/ZIP-based inputs are checked for entry counts and expanded size before
rendering. Only the currently selected file is exposed under an unguessable local
URL. WebView2 blocks filesystem navigation, remote network requests, downloads,
popups, host objects, and document permissions. Markdown/EPUB use DOMPurify.
All bytes and archive image pages remain in memory; deselection closes streams,
terminates archive workers, unloads fonts, and disposes 3D resources. The shared
small-file cache is capped at 16 MB. These limits are protective bounds, not a
promise of zero resource use or identical behavior for every malformed file.

Native smoke tests generate synthetic fixtures and verify Word fitting, PDF/Word
find, text larger than 50 KB, the new format renderers, script/network isolation,
and main-window selection. Real-world FBX variants, RAR/7z combinations, media
codecs, and complex Office documents still need broader compatibility testing.
