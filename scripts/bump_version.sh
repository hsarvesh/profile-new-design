#!/usr/bin/env bash
set -euo pipefail
# Bump the minor version in version.json (major.minor.patch).
# This script is safe to run multiple times. It will create version.json if missing.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION_FILE="$REPO_ROOT/version.json"

if [ ! -f "$VERSION_FILE" ]; then
  printf '{"version":"0.0.0"}\n' > "$VERSION_FILE"
fi

content=$(cat "$VERSION_FILE")

if [[ $content =~ "version"[[:space:]]*:[[:space:]]*"([0-9]+)\.([0-9]+)\.([0-9]+)" ]]; then
  major=${BASH_REMATCH[1]}
  minor=${BASH_REMATCH[2]}
  patch=${BASH_REMATCH[3]}
else
  major=0
  minor=0
  patch=0
fi

# bump minor, reset patch
minor=$((minor + 1))
patch=0
new_version="$major.$minor.$patch"

printf '{"version":"%s"}\n' "$new_version" > "$VERSION_FILE"

# stage the file so the commit includes the bumped version
git add "$VERSION_FILE" || true

echo "Bumped version -> $new_version"
