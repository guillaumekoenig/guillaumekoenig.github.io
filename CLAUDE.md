# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```sh
make          # Build all HTML files into _site/
make watch    # Watch src/*.md and rebuild on changes (requires watchexec)
make clean    # Remove _site/
```

Install filter dependencies (required before first build):
```sh
cd filter && npm install
```

## Architecture

This is a static notes site. Markdown source lives in `src/`, HTML output goes to `_site/`.

**Build pipeline:** `make` invokes `pandoc` for each `src/*.md` file using `defaults.yaml` as configuration. Pandoc uses `src/default.html` as its HTML template and `src/overrides.css` for styles. A Pandoc JSON AST filter (`filter/filter.js`) post-processes each document.

**`filter/filter.js`** (Node.js, ES module) does three things to Pandoc's JSON AST:
1. Renders `Math` nodes to HTML via KaTeX (inline and display modes, plus raw `align*`/`aligned` tex environments)
2. Injects a KaTeX stylesheet into `header-includes`
3. Rewrites inter-document links from `.md` → `.html`

**`defaults.yaml`** sets the pandoc input format (`markdown-smart+tex_math_single_backslash`), shifts headings by 2 levels, and declares the filter and template.

**Branch model:** The `source` branch holds all source files. On push, GitHub Actions builds the site and force-pushes generated HTML to the `main` branch as a single amended commit. The `fixup` script (`./fixup`) squashes local commits on `source` to keep history clean before pushing.
