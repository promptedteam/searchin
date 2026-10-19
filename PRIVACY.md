# SEARCH-IN Privacy

SEARCH-IN is a local-first Windows search application, formerly LOCALOCR.

## Local Data

Filename catalogs, extracted document text, content-index databases, indexing progress, bookmarks, directory scopes, and previews remain on the computer. The application has no telemetry, analytics, or advertising client.

SEARCH-IN configuration and Windows-account-protected API credentials persist under `%LOCALAPPDATA%\SEARCH-IN\Config`, independently of the installed binaries. Existing v2 indexes and bookmarks retain their established state location. Portable working data is under the extracted `Data\User` folder; API configuration still uses the stable per-user configuration directory.

## Update Requests

SEARCH-IN 2.1.0.103 and later check the public GitHub distribution channel over HTTPS. A release-hosted `search-in-update.json` is used first, with a default-branch fallback. Checks are quiet; an available update displays a download indicator rather than opening an automatic popup.

Only after the user opens the updater and chooses Download does SEARCH-IN retrieve Setup, show progress, verify SHA-256, and ask before launching it. Requests include standard connection information such as IP address and user agent. They do not include document contents, names, paths, search terms, or index data.

The legacy `update.json` channel is reserved for LOCALOCR 1.x and is kept separate from SEARCH-IN. Earlier local SEARCH-IN builds disabled online update checks and need a one-time manual installation of the public release.

## Optional AI OCR

Local extraction runs first. Only eligible files still lacking usable text enter the AI Pending queue. AI work starts after a user-configured provider and explicit confirmation of a bounded run. The selected provider or CLI may receive file contents; its pricing, quotas, retention, and account terms apply.

- API key collections and imported Google credentials are encrypted for the current Windows account, not written in plaintext to `settings.json` or GitHub.
- Codex, Claude, and Gemini CLI integrations use their own installed authentication; SEARCH-IN does not read or display their login tokens.
- Imported `.costf` files are read locally. Protect the original file separately.
- Key rotation and cooldown waiting do not bypass provider quotas or terms.

The reserved server menu is not an active cloud-storage connection. Public tutorial media uses synthetic files, fictional paths, and an invalid demo key only.

## Removal

The uninstaller removes application binaries and its service, not your retained per-user configuration automatically. Close SEARCH-IN and its indexer before deliberately removing local configuration or index data. LOCALOCR 1.x data is not silently deleted or converted by the SEARCH-IN installer.
