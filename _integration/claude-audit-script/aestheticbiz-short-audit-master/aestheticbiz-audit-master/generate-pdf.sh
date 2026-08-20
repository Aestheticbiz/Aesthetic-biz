#!/usr/bin/env bash
set -euo pipefail
browser="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$browser" ]]; then echo "Chrome/Chromium was not found."; exit 1; fi
page="file://$(pwd)/index.html"
output="${1:-audit-report.pdf}"
"$browser" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$(pwd)/$output" "$page"
echo "PDF created: $output"
