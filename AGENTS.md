## Repository expectations

- After changes ask should we update `./Readme.md` file
- After changes ask should we update Storubook stories in `./stories`

## Testing instructions

- Add or update tests for the code you change, even if nobody asked.
- After changes updates tests in `./tests/types` and check with command `npm run typecheck`

## Working agreements

- Prefer `npm` exact dependencies versions when installing dependencies.
- Ask for confirmation before adding new production dependencies.

## Skills

A skill is a set of local instructions to follow that is stored in a `SKILL.md` file.

### Available skills

- changelog-last-tag: Generate GitHub release notes or changelog text from git commits since the latest tag (or a specified tag). Use when asked to draft a "What's Changed" section or release notes based on commit history since the last tagged release. (file: /Users/max/Projects/react-pure-modal/skills/changelog-last-tag/SKILL.md)

### How to use skills

- Mention the skill by name in your request and I will open its `SKILL.md` and follow the workflow.
- If multiple skills apply, say which ones to use and their order.
