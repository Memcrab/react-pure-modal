---
name: changelog-last-tag
description: Generate GitHub release notes or changelog text from git commits since the latest tag (or a specified tag). Use when asked to draft a "What's Changed" section or release notes based on commit history since the last tagged release.
---

# Changelog Last Tag

## Overview

Produce Markdown release notes from commits between the latest tag and a target ref, then return the Markdown text directly in chat.

## Workflow

1. Identify the range
   - Use `git describe --tags --abbrev=0` to find the latest tag.
   - If no tags exist, ask for a starting ref or fall back to the first commit.
   - Default the end ref to `HEAD` unless the user specifies a tag or SHA.

2. Generate the draft
   - Run `scripts/generate_release_changelog.py` to emit Markdown.
   - Keep output in the chat only; do not write files.

3. Polish the output
   - Rewrite terse commit subjects into user-facing bullets.
   - Drop empty sections.
   - Keep breaking changes at the top.

## Script usage

```bash
python3 scripts/generate_release_changelog.py --help
python3 scripts/generate_release_changelog.py --from-tag v1.2.3 --to-ref HEAD
python3 scripts/generate_release_changelog.py --match-tag "v*" --include-sha
```

## Output rules

- Respond only with Markdown text in chat.
- Do not create or modify files.
- Prefer headings and bullets (no code fences around the final release notes).

## Categorization

- `feat` -> Features
- `fix` -> Fixes
- `perf` -> Performance
- `refactor` -> Refactor
- `docs` -> Docs
- `test/tests` -> Tests
- `build` -> Build
- `ci` -> CI
- `chore` -> Chore
- Unmatched -> Other
- Any breaking change (`!` or `BREAKING CHANGE`) -> Breaking Changes
