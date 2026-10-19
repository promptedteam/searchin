# AI OCR in SearchIn

AI OCR is an optional second stage of the In-File index. It never replaces filename search and never starts automatically.

## Workflow

1. Open the Content Indexer and choose a folder or explicitly choose Entire PC.
2. Press **Start**. SearchIn extracts PDF, Office, text, and code content locally.
3. Files that still have no searchable text and are eligible for OCR appear under **AI Pending**.
4. Open **AI OCR Settings**, choose a provider and model, and add one or more keys. Check keys to enable them, then press **Save** or **Check setup** (which also saves).
5. Press **Start AI OCR**, review the confirmation, and approve the bounded run.

Completed OCR text is written to the same local SQLite FTS5 index used by In-File search. If the source file changes, stale OCR text is removed and the file returns to the pending queue.

## Provider choices

- Google Cloud Vision accepts an API key or an unencrypted Cloud OCR Snip `.costf` service-account export.
- OpenAI, Anthropic, and Google Gemini have native adapters for their supported image/PDF APIs.
- OpenAI-compatible profiles cover hosted services and local endpoints such as Ollama or LM Studio. A vision-capable model is still required.
- Codex CLI, Claude CLI, and Gemini CLI use the CLI installed on the computer and its own existing login.

Provider support varies by model and account. A profile in the list does not guarantee that every model offered by that provider accepts images. PDFs are enabled only for adapters that support direct PDF input.

## Credentials and privacy

- API credentials are encrypted with Windows DPAPI for the current Windows account.
- General settings and the encrypted key store live in the absolute, per-user `%LOCALAPPDATA%\SEARCH-IN\Config` directory, even for portable builds. They are independent of the executable, extraction folder and current working directory. Use the same Windows account after updating.
- Credentials are stored separately from `settings.json`; the UI never displays an existing credential.
- Writes use a cross-process lock, disk flush, atomic replacement, encrypted backup and read-back verification. `persistence.log` records success/error types without keys or provider response bodies. A save error keeps the settings window open. Existing unreadable credentials are not silently replaced with an empty store.
- Older v2 settings and single-key credentials migrate automatically from the current data folder or installed v2 data folder. Original files are retained. If credentials existed only in a different old portable extraction folder, keep that folder and migrate before deleting it.
- SearchIn checks CLI installation and login status but does not read, copy, or store CLI login tokens.
- `.costf` files are ignored by source control and are not included in release packages.
- Local extraction does not contact an AI provider. A provider receives a file only after the user starts and confirms an AI OCR run.
- Provider pricing, quotas, retention, regional processing, and acceptable-use terms still apply.

Use a focused folder and a conservative per-run limit for sensitive or metered workloads. Revoke a provider key from its provider console if the original key file or account may have been exposed.

## Multiple Keys And Rate Limits

Every HTTP provider has a key list, enabled flags, an active pointer and UTC cooldown timestamps. **Add key** adds a masked new entry; **Remove** removes the selected entry on Save. Switching providers retains unsaved entries. Google `.costf` import adds a credential rather than replacing other entries. CLI profiles continue to use their own existing login and do not expose an API key list.

On HTTP 429 the current key enters cooldown and the same file is retried with the next enabled, ready key. If none are ready, the indexer shows a rate-limit pause and asynchronously waits until the closest cooldown expires. Stop cancels the wait without discarding queue progress. Adding an enabled key during a wait is detected within five seconds. Cooldowns persist, but an OCR job never starts automatically on app startup.

The handler reads Retry-After seconds/HTTP dates, provider reset headers, retry-after-ms, and Google RetryInfo. When no timing is supplied, it uses exponential backoff from 60 seconds up to 15 minutes. Keys under the same account/project can share a quota; rotation does not create more quota. See the official [Groq rate limits](https://console.groq.com/docs/rate-limits), [Claude rate limits](https://platform.claude.com/docs/en/api/rate-limits), [Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), and [OpenAI rate limits](https://developers.openai.com/api/docs/guides/rate-limits).

The decrypted schema is version 2, keyed by stable provider IDs rather than translated display names. Only its encrypted representation is written to disk:

```json
{
  "schemaVersion": 2,
  "providers": {
    "groq": {
      "keys": [
        { "id": "stable-key-id", "label": "Key 1", "key": "example-only", "is_active": true, "cooldown_until": null }
      ],
      "active_index": 0
    }
  }
}
```
