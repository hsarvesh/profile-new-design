#!/usr/bin/env bash
set -euo pipefail
# Produce a version based on git commit history.
# For a commit being created (pre-commit), we compute the upcoming commit count
# so the committed version reflects the commit number in the repository.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION_FILE="$REPO_ROOT/version.json"

if [ ! -f "$VERSION_FILE" ]; then
  printf '{"version":"0.0.0"}\n' > "$VERSION_FILE"
fi

# Determine the current commit count on HEAD. If there are no commits yet, count=0.
count=0
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  # number of commits in current branch history
  count=$(git rev-list --count HEAD 2>/dev/null || echo 0)
else
  count=0
fi

# If running as a pre-commit hook, the new commit will be HEAD + 1.
# To make the version reflect the commit being created, bump the count by 1
# when GIT_COMMIT (or during pre-commit phase). We'll assume this script is
# typically run from the pre-commit hook, so increment by 1.
next_count=$((count + 1))

# Compose version as major.minor.patch where minor == next_count
major=0
minor=$next_count
patch=0
new_version="$major.$minor.$patch"

printf '{"version":"%s"}\n' "$new_version" > "$VERSION_FILE"

# Stage the file so the commit includes the bumped version (pre-commit path).
git add "$VERSION_FILE" || true

echo "Updated version -> $new_version (based on commit count: $next_count)"
