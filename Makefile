katex_version := $(shell ./filter/filter.js --version)

pandocargs := \
	--template=src/default.html \
	--variable document-css=true \
	--css https://cdn.jsdelivr.net/npm/katex@$(katex_version)/dist/katex.min.css \
	--filter ./filter/filter.js \
	--lua-filter=ast-transforms.lua \
	--shift-heading-level-by=2 \
	--from markdown-smart+tex_math_single_backslash

html := $(shell cd src; for i in *.md; do echo _site/$${i%%.md}.html; done)

.PHONY: all
all: $(html) _site/scroll.html

_site/%.html: src/%.md Makefile src/default.html src/overrides.css
	pandoc $(pandocargs) -s -o $@ $<

_site/scroll.html: src/scroll.html
	cp $< $@
