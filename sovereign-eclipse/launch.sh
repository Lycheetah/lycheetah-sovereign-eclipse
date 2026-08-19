#!/usr/bin/env bash
# Serve the modular tree. ES modules cannot boot from file://.
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8765}"
echo "Sovereign Eclipse  →  http://127.0.0.1:${PORT}/"
echo "Gold master stays at archive/forge275_monolith_last_known_good.html"
echo "Ctrl+C to stop."
exec python3 -m http.server "$PORT" --bind 127.0.0.1
