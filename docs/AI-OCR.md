# Optional AI OCR

LOCALOCR 1.5.1.100 adds a manual second stage for images and scanned PDFs that the local content index cannot read.

## Use it

1. Open the Content Indexer and choose a focused folder.
2. Press **Start** to run local extraction first.
3. Review the **AI Pending** count after the local pass completes.
4. Open **AI OCR Settings** and select a provider.
5. Press **Check setup**, then **Start AI OCR** and confirm the bounded run.

The provider list includes native Google Cloud Vision, OpenAI, Anthropic, and Gemini adapters; configurable OpenAI-compatible services and local endpoints; and Codex, Claude, and Gemini CLI adapters. A vision-capable model and a valid provider account are still required.

Google Cloud Vision can use a manually entered API key or import an unencrypted Cloud OCR Snip `.costf` service-account export. LOCALOCR stores the imported credential with Windows account protection and never includes the source `.costf` in application updates.

CLI adapters use the CLI's own existing login. LOCALOCR checks whether the CLI is installed and signed in but does not read, copy, or publish its login token.

AI OCR never starts automatically. Use a focused scope and a conservative per-run limit for private or metered documents. See [Privacy](../PRIVACY.md) before sending sensitive files to a provider.
