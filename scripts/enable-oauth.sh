#!/usr/bin/env bash
# Turn on Google and/or GitHub sign-in for the linked Supabase project.
# Usage (after `npx supabase login`):
#   GITHUB_CLIENT_ID=... GITHUB_SECRET=... GOOGLE_CLIENT_ID=... GOOGLE_SECRET=... scripts/enable-oauth.sh
# Provide the pair(s) you have; the others stay off. Secrets are only sent to Supabase, never written to files.
set -euo pipefail
cd "$(dirname "$0")/.."
REF="${SUPABASE_PROJECT_REF:-$(grep -o 'https://[a-z0-9]*' .env | head -1 | sed 's#https://##')}"
on=0
for P in GITHUB GOOGLE; do
  id="${P}_CLIENT_ID"; sec="${P}_SECRET"; lower=$(echo "$P" | tr A-Z a-z)
  if [ -n "${!id:-}" ] && [ -n "${!sec:-}" ]; then
    export "SUPABASE_AUTH_EXTERNAL_${P}_CLIENT_ID=${!id}" "SUPABASE_AUTH_EXTERNAL_${P}_SECRET=${!sec}"
    python3 - "$lower" <<'PY'
import re,sys
p=sys.argv[1]; f='supabase/config.toml'; s=open(f).read()
s=re.sub(r'(\[auth\.external\.%s\]\nenabled = )false' % p, r'\1true', s); open(f,'w').write(s)
PY
    echo "enabling $lower"; on=1
  fi
done
[ "$on" = 1 ] || { echo "Set GITHUB_CLIENT_ID+GITHUB_SECRET and/or GOOGLE_CLIENT_ID+GOOGLE_SECRET"; exit 1; }
npx --yes supabase@latest config push --project-ref "$REF" --yes
