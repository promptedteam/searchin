# LOCALOCR Privacy

LOCALOCR is designed as a local-first Windows search application.

## Data that remains local

- Filename and path catalog data.
- Extracted PDF, Office, text, and code content.
- Content-index databases and indexing progress.
- Application settings, bookmarks, directory scopes, and file lists.
- File previews and preview-handler output.
- AI provider configuration. API credentials are stored separately using Windows account protection.

LOCALOCR does not include telemetry, analytics, or advertising. Local content extraction does not contact an AI provider.

## Network activity

LOCALOCR retrieves `update.json` from this public GitHub repository over HTTPS shortly after startup and whenever `Help > Check for Updates` is selected. The startup request stays silent unless a newer release exists. If the user chooses Download, LOCALOCR retrieves the published Setup asset from GitHub into its local update cache, shows progress, verifies the manifest SHA-256, and asks before launching Setup. The installer is not downloaded or run automatically.

Requests contain standard HTTP connection information such as the IP address and user agent that GitHub normally receives. Update checks and downloads do not upload file names, paths, document contents, search terms, index data, or previews.

## Optional AI OCR

AI OCR is disabled until the user configures a provider and manually starts a run. LOCALOCR first attempts local extraction. Only eligible images and scanned PDFs that remain unreadable enter the AI Pending queue.

Before each AI run, LOCALOCR shows the provider and file count and asks for confirmation. The selected cloud API or AI CLI may receive the complete contents of those files. Provider pricing, quotas, retention, regional processing, and account terms apply.

- API keys and imported Google service-account credentials are encrypted for the current Windows account and are not stored in `settings.json`.
- Codex CLI, Claude CLI, and Gemini CLI use their own installed login. LOCALOCR checks status but does not read or store their login token.
- Importing a `.costf` file reads it locally; the original file remains under the user's control and should be protected or removed when no longer needed.
- Changing a source file invalidates its previous AI text and returns it to the pending queue.

The disabled LOCALOCR Server menu entry is reserved for a future feature and does not create a server connection in version `1.5.1.100`.

## Data removal

The uninstaller can remove the local catalog, content index, settings, bookmarks, and protected AI credential store. Portable mode keeps its state inside the extracted `Data` folder, which can be removed with the portable folder after LOCALOCR is closed.
