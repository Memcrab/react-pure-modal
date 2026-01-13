#!/usr/bin/env python3
import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from typing import Dict, List, Optional
from urllib.parse import quote


SECTION_ORDER = [
    "Breaking Changes",
    "Features",
    "Fixes",
    "Performance",
    "Refactor",
    "Docs",
    "Tests",
    "Build",
    "CI",
    "Chore",
    "Other",
]

TYPE_TO_SECTION = {
    "feat": "Features",
    "fix": "Fixes",
    "perf": "Performance",
    "refactor": "Refactor",
    "docs": "Docs",
    "test": "Tests",
    "tests": "Tests",
    "build": "Build",
    "ci": "CI",
    "chore": "Chore",
    "style": "Other",
}

CONVENTIONAL_RE = re.compile(
    r"^(?P<type>[a-zA-Z]+)(\((?P<scope>[^)]+)\))?(?P<breaking>!)?: (?P<subject>.+)$"
)
BREAKING_RE = re.compile(r"BREAKING CHANGE|BREAKING-CHANGE", re.IGNORECASE)
PR_RE = re.compile(r"\(#(?P<num>\d+)\)$")


@dataclass
class Commit:
    sha: str
    subject: str
    body: str


def run_git(args: List[str], allow_fail: bool = False) -> str:
    proc = subprocess.run(
        ["git"] + args,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if proc.returncode != 0:
        if allow_fail:
            return ""
        message = proc.stderr.strip() or f"git {' '.join(args)} failed"
        raise RuntimeError(message)
    return proc.stdout.strip()


def ensure_repo() -> None:
    try:
        run_git(["rev-parse", "--show-toplevel"])
    except RuntimeError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)


def latest_tag(match: Optional[str]) -> Optional[str]:
    args = ["describe", "--tags", "--abbrev=0"]
    if match:
        args += ["--match", match]
    output = run_git(args, allow_fail=True)
    return output or None


def origin_url() -> Optional[str]:
    output = run_git(["remote", "get-url", "origin"], allow_fail=True)
    return output or None


def github_repo_url(remote: Optional[str]) -> Optional[str]:
    if not remote:
        return None
    if remote.startswith("git@github.com:"):
        path = remote[len("git@github.com:") :]
    elif remote.startswith("ssh://git@github.com/"):
        path = remote[len("ssh://git@github.com/") :]
    elif remote.startswith("https://github.com/"):
        path = remote[len("https://github.com/") :]
    elif remote.startswith("http://github.com/"):
        path = remote[len("http://github.com/") :]
    else:
        return None
    if path.endswith(".git"):
        path = path[:-4]
    return f"https://github.com/{path}"


def git_log(
    from_ref: Optional[str],
    to_ref: str,
    max_commits: Optional[int],
    include_merges: bool,
) -> List[Commit]:
    fmt = "%H%x1f%s%x1f%b%x1e"
    args = ["log", f"--format={fmt}"]
    if not include_merges:
        args.append("--no-merges")
    if not from_ref:
        args.append("--root")
    if max_commits:
        args += ["-n", str(max_commits)]
    if from_ref:
        args.append(f"{from_ref}..{to_ref}")
    else:
        args.append(to_ref)
    output = run_git(args, allow_fail=True)
    if not output:
        return []
    records = output.strip("\n\x1e").split("\x1e")
    commits: List[Commit] = []
    for record in records:
        if not record.strip():
            continue
        parts = record.split("\x1f")
        if len(parts) < 3:
            continue
        sha, subject, body = parts[0], parts[1], parts[2]
        commits.append(Commit(sha=sha, subject=subject.strip(), body=body.strip()))
    return commits


def parse_commit(commit: Commit, include_sha: bool) -> (str, str):
    subject = commit.subject.strip()
    body = commit.body.strip()
    breaking = False
    section = "Other"
    title = subject

    match = CONVENTIONAL_RE.match(subject)
    if match:
        commit_type = match.group("type").lower()
        breaking = bool(match.group("breaking"))
        title = match.group("subject").strip()
        section = TYPE_TO_SECTION.get(commit_type, "Other")
    if BREAKING_RE.search(body):
        breaking = True
    if breaking:
        section = "Breaking Changes"

    pr = None
    pr_match = PR_RE.search(title)
    if pr_match:
        pr = pr_match.group("num")
        title = title[: pr_match.start()].rstrip()

    suffix_parts: List[str] = []
    if pr:
        suffix_parts.append(f"#{pr}")
    if include_sha:
        suffix_parts.append(commit.sha[:7])
    suffix = f" ({', '.join(suffix_parts)})" if suffix_parts else ""
    return section, f"- {title}{suffix}"


def build_output(
    commits: List[Commit],
    include_sha: bool,
    compare_url: Optional[str],
    include_compare_link: bool,
) -> str:
    sections: Dict[str, List[str]] = {section: [] for section in SECTION_ORDER}
    for commit in commits:
        section, line = parse_commit(commit, include_sha)
        sections.setdefault(section, []).append(line)

    lines: List[str] = []
    for section in SECTION_ORDER:
        items = sections.get(section, [])
        if not items:
            continue
        lines.append(f"## {section}")
        lines.extend(items)
        lines.append("")

    if include_compare_link and compare_url:
        if lines and lines[-1] != "":
            lines.append("")
        lines.append(f"Full Changelog: {compare_url}")

    return "\n".join(lines).rstrip()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate Markdown release notes from git commits since the latest tag."
    )
    parser.add_argument("--from-tag", help="Start tag/ref (defaults to latest tag)")
    parser.add_argument("--match-tag", help="Tag pattern for latest tag lookup (ex: 'v*')")
    parser.add_argument("--to-ref", default="HEAD", help="Target ref (default: HEAD)")
    parser.add_argument("--include-sha", action="store_true", help="Include short SHA in bullets")
    parser.add_argument("--include-merges", action="store_true", help="Include merge commits")
    parser.add_argument("--max-commits", type=int, help="Limit the number of commits scanned")
    parser.add_argument(
        "--no-compare-link",
        action="store_true",
        help="Disable the GitHub compare link in output",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    ensure_repo()

    from_ref = args.from_tag or latest_tag(args.match_tag)
    if not from_ref:
        print("No tags found; using full history.", file=sys.stderr)

    commits = git_log(from_ref, args.to_ref, args.max_commits, args.include_merges)
    if not commits:
        print("No commits found for the selected range.", file=sys.stderr)
        return 0

    compare_link = None
    if from_ref and not args.no_compare_link:
        repo_url = github_repo_url(origin_url())
        if repo_url:
            compare_link = (
                f"{repo_url}/compare/{quote(from_ref, safe='')}"
                f"...{quote(args.to_ref, safe='')}"
            )

    output = build_output(commits, args.include_sha, compare_link, not args.no_compare_link)
    if output:
        print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
