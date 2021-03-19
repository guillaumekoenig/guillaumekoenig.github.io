pandocargs = \
	--template=src/default.html5 \
	--variable document-css=true \
	--filter ./filter/filter \
	--lua-filter=ast-transforms.lua \
	--shift-heading-level-by=2 \
	--from markdown-smart+tex_math_single_backslash

html = $(shell cd src; for i in *.md; do echo _site/$${i%%.md}.html; done)

.PHONY: all
all: $(html) _site/scroll.html

_site/%.html: src/%.md Makefile src/default.html5 src/styles.html
	pandoc $(pandocargs) -s -o $@ $<

_site/scroll.html: src/scroll.html
	cp $< $@
