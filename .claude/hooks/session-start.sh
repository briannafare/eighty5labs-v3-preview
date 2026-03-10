#!/bin/bash
# Session startup hook: installs gh, vercel, notebooklm-py, Google Workspace CLI
# and authenticates each tool. Credentials are read from environment variables —
# set them in .claude/settings.local.json under "env" (never commit that file; it's gitignored).
#
# Required env vars:
#   GITHUB_TOKEN          — GitHub Personal Access Token (repo + read:org scopes)
#   VERCEL_TOKEN          — Vercel personal access token
#   NOTEBOOKLM_EMAIL      — Google account email for NotebookLM
#   NOTEBOOKLM_PASSWORD   — Google account password for NotebookLM
#   GOOGLE_WORKSPACE_TOKEN — Google Workspace CLI OAuth/service-account token

set -euo pipefail

log() { echo "[session-start] $*" >&2; }

# ─── 1. gh (GitHub CLI) ───────────────────────────────────────────────────────
install_gh() {
  if ! command -v gh &>/dev/null || [[ "$(gh --version 2>/dev/null | head -1)" == *"2.8"* ]]; then
    log "Installing gh CLI..."
    curl -fsSL https://github.com/cli/cli/releases/download/v2.65.0/gh_2.65.0_linux_amd64.tar.gz \
      -o /tmp/gh.tar.gz
    tar -xzf /tmp/gh.tar.gz -C /tmp
    sudo mv /tmp/gh_2.65.0_linux_amd64/bin/gh /usr/local/bin/gh
    # Remove npm stub if present
    [[ -L /opt/node22/bin/gh ]] && sudo rm /opt/node22/bin/gh || true
    log "gh $(gh --version | head -1) installed."
  else
    log "gh already installed: $(gh --version | head -1)"
  fi
}

auth_gh() {
  if [[ -z "${GITHUB_TOKEN:-}" ]]; then
    log "GITHUB_TOKEN not set — skipping gh auth."
    return
  fi
  if gh auth status &>/dev/null; then
    log "gh already authenticated."
    return
  fi
  echo "$GITHUB_TOKEN" | gh auth login --with-token
  log "gh authenticated as $(gh api user -q .login 2>/dev/null || echo '(unknown)')."
}

# ─── 2. Vercel CLI ────────────────────────────────────────────────────────────
install_vercel() {
  if ! command -v vercel &>/dev/null; then
    log "Installing Vercel CLI..."
    npm install -g vercel --quiet
    log "Vercel $(vercel --version) installed."
  else
    log "Vercel already installed: $(vercel --version)"
  fi
}

auth_vercel() {
  if [[ -z "${VERCEL_TOKEN:-}" ]]; then
    log "VERCEL_TOKEN not set — skipping Vercel auth."
    return
  fi
  # Vercel reads VERCEL_TOKEN automatically; persist it for subsequent Bash calls.
  if [[ -n "${CLAUDE_ENV_FILE:-}" ]]; then
    echo "export VERCEL_TOKEN=${VERCEL_TOKEN}" >> "$CLAUDE_ENV_FILE"
  fi
  log "VERCEL_TOKEN exported for Vercel CLI."
}

# ─── 3. notebooklm-py ─────────────────────────────────────────────────────────
install_notebooklm() {
  if ! python -c "import notebooklm" &>/dev/null; then
    log "Installing notebooklm-py[browser]..."
    pip install --quiet "notebooklm-py[browser]"
    log "notebooklm-py installed."
  else
    log "notebooklm-py already installed."
  fi
}

auth_notebooklm() {
  if [[ -z "${NOTEBOOKLM_EMAIL:-}" || -z "${NOTEBOOKLM_PASSWORD:-}" ]]; then
    log "NOTEBOOKLM_EMAIL / NOTEBOOKLM_PASSWORD not set — skipping notebooklm auth."
    return
  fi
  # notebooklm-py reads these env vars when using --browser mode.
  if [[ -n "${CLAUDE_ENV_FILE:-}" ]]; then
    echo "export NOTEBOOKLM_EMAIL=${NOTEBOOKLM_EMAIL}" >> "$CLAUDE_ENV_FILE"
    echo "export NOTEBOOKLM_PASSWORD=${NOTEBOOKLM_PASSWORD}" >> "$CLAUDE_ENV_FILE"
  fi
  log "NOTEBOOKLM_EMAIL / NOTEBOOKLM_PASSWORD exported for notebooklm-py."
}

# ─── 4. Google Workspace CLI ──────────────────────────────────────────────────
install_google_workspace() {
  if ! command -v gwcli &>/dev/null; then
    log "Installing @googleworkspace/cli..."
    npm install -g @googleworkspace/cli --quiet
    log "Google Workspace CLI installed."
  else
    log "Google Workspace CLI already installed."
  fi
}

auth_google_workspace() {
  if [[ -z "${GOOGLE_WORKSPACE_TOKEN:-}" ]]; then
    log "GOOGLE_WORKSPACE_TOKEN not set — skipping Google Workspace CLI auth."
    return
  fi
  # The CLI reads GOOGLE_WORKSPACE_TOKEN for non-interactive auth.
  if [[ -n "${CLAUDE_ENV_FILE:-}" ]]; then
    echo "export GOOGLE_WORKSPACE_TOKEN=${GOOGLE_WORKSPACE_TOKEN}" >> "$CLAUDE_ENV_FILE"
  fi
  log "GOOGLE_WORKSPACE_TOKEN exported for Google Workspace CLI."
}

# ─── Run all steps ────────────────────────────────────────────────────────────
install_gh
auth_gh
install_vercel
auth_vercel
install_notebooklm
auth_notebooklm
install_google_workspace
auth_google_workspace

log "Session setup complete."

# Output context for Claude
jq -n '{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Tools ready: gh (GitHub CLI), Vercel CLI, notebooklm-py, Google Workspace CLI."
  }
}' 2>/dev/null || true

exit 0
