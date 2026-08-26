<div align="center">

# LOCALOCR

### Fast Windows file search, local content discovery, and optional AI OCR

[![Latest release](https://img.shields.io/github/v/release/promptedteam/LOCALOCR?display_name=tag&style=flat-square&color=1687ff)](https://github.com/promptedteam/LOCALOCR/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/promptedteam/LOCALOCR/total?style=flat-square&color=1687ff)](https://github.com/promptedteam/LOCALOCR/releases)
[![GitHub stars](https://img.shields.io/github/stars/promptedteam/LOCALOCR?style=flat-square&color=1687ff)](https://github.com/promptedteam/LOCALOCR/stargazers)
![Windows](https://img.shields.io/badge/Windows-10%20%7C%2011-1687ff?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-x64-273142?style=flat-square)

[Download Setup](https://github.com/promptedteam/LOCALOCR/releases/download/1.5.2.100/LOCALOCR-1.5.2.100-Setup.exe) · [Download Portable](https://github.com/promptedteam/LOCALOCR/releases/download/1.5.2.100/LOCALOCR-1.5.2.100-portable.zip) · [Release notes](https://github.com/promptedteam/LOCALOCR/releases/tag/1.5.2.100)

</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/localocr-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="docs/images/localocr-light.png">
  <img alt="LOCALOCR file search with live preview" src="docs/images/localocr-light.png">
</picture>

## Find locally

LOCALOCR combines fast filename search, manually scoped local content indexing, and file previews in one compact Windows desktop application. Local extraction stays on the computer. Optional AI OCR contacts a selected provider only after the user explicitly starts and confirms a bounded run.

| Capability | What it provides |
| --- | --- |
| **Files** | Fast filename and path search backed by a native NTFS/MFT catalog with live USN Journal updates. |
| **In-File** | Search text extracted from selected folders or, only when explicitly chosen, the entire PC. |
| **Optional AI OCR** | After local extraction, process only unreadable images and scanned PDFs through a configured API or installed AI CLI. |
| **Preview** | Images, PDF, Office documents, text, code, and compatible Windows preview handlers in a hidden isolated host. |
| **Focused scope** | Limit filename or content work to a directory while retaining the option to search the PC. |
| **Responsive results** | Bounded rendering, background engine work, sortable columns, quick filters, and highlighted matches. |
| **System, light, and dark** | Follows the Windows app theme by default while preserving explicit Light and Dark overrides. |
| **Verified updates** | Downloads Setup inside LOCALOCR with visible progress and enables installation only after SHA-256 verification. |
| **Companion access** | Provides a current-user-only, read-only search bridge for LOCALTOOL without installing another engine. |

LOCALOCR is independent software and does not require Everything or the Everything SDK.

## Get LOCALOCR

| Package | Best for | Download |
| --- | --- | --- |
| **Setup** | Recommended. Installs the application and LOCALOCR Engine service, creates shortcuts, and supports in-place updates. | [LOCALOCR-1.5.2.100-Setup.exe](https://github.com/promptedteam/LOCALOCR/releases/download/1.5.2.100/LOCALOCR-1.5.2.100-Setup.exe) |
| **Portable** | Testing without a normal application install. Extract the complete ZIP before opening `LOCALOCR.exe`. | [LOCALOCR-1.5.2.100-portable.zip](https://github.com/promptedteam/LOCALOCR/releases/download/1.5.2.100/LOCALOCR-1.5.2.100-portable.zip) |

**Requirements:** Windows 10 or Windows 11, x64. LOCALOCR uses Microsoft .NET 10 Desktop Runtime. Setup detects it and can download the official Microsoft installer when required. The native engine statically includes its MSVC runtime, so a separate Visual C++ redistributable is not required.

The Setup package requests administrator access to install the LOCALOCR Engine service. Portable mode can install that same service when requested or run an elevated temporary engine session.

## Verify the download

```text
3D4ED09614664F4814985F14B02A62C32E768C1DC1DAD164765B733869DA91F3  LOCALOCR-1.5.2.100-Setup.exe
335268B7F01812A4A7536410F21ABFC5BC84CC6B038B868C3E18E766AA8CB267  LOCALOCR-1.5.2.100-portable.zip
```

The same values are included in `SHA256SUMS.txt` on the release page.

## Privacy boundary

Filename catalogs, locally extracted content, settings, and bookmarks stay on the local computer. LOCALOCR has no telemetry or analytics client. AI OCR is off by default; when explicitly started, the selected provider receives only the pending files in that confirmed run. See [AI OCR](docs/AI-OCR.md) and [PRIVACY.md](PRIVACY.md) for the complete boundary.

## Version numbers

LOCALOCR uses `MAJOR.MINOR.FEATURE.PATCH`:

| Change size | Example |
| --- | --- |
| Small correction | `1.5.2.100` → `1.5.2.101` |
| Feature update | `1.5.2.101` → `1.5.3.100` |
| Broad product update | `1.5.3.100` → `1.6.0.100` |
| Generational release | `1.x` → `2.0.0.0` |

## Distribution and source

This is the public **distribution repository**. It contains release information, screenshots, checksums, and update metadata. Release binaries are stored as GitHub Release assets rather than committed to the repository.

LOCALOCR source code is maintained privately and is not included in this public distribution repository. Publishing releases here does not publish or license the source code.

## Star history

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/star-history-dark.svg">
  <img alt="LOCALOCR GitHub star history" src="docs/images/star-history.svg">
</picture>

The chart refreshes weekly through a pinned GitHub Actions workflow and uses the repository's built-in token; no personal access token is stored in this repository. Until the first star is recorded, the chart displays its ready state.

---

<div align="center">
  <strong>LOCALOCR 1.5.2.100</strong><br>
  Search fast. Search locally.
</div>
