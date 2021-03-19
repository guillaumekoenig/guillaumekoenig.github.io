KATEX_VERSION := $(shell ./filter/filter.js --version)

MD_FILES := $(wildcard src/*.md)
HTML_FILES := $(patsubst src/%.md,_site/%.html,$(MD_FILES))

SHARED_DEPS := defaults.yaml src/default.html src/overrides.css

.PHONY: all clean watch

all: $(HTML_FILES)

_site/%.html: src/%.md $(SHARED_DEPS) Makefile
	@mkdir -p _site
	pandoc --defaults=defaults.yaml -s -o $@ $<

watch:
	fswatch -o src | xargs -n1 -I{} make -j2

clean:
	rm -rf _site
