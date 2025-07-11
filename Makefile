MD_FILES := $(wildcard src/*.md)
HTML_FILES := $(patsubst src/%.md,_site/%.html,$(MD_FILES))

SHARED_DEPS := defaults.yaml src/default.html src/overrides.css \
	filter/filter.js Makefile

.PHONY: all clean watch

all: $(HTML_FILES)

_site/%.html: src/%.md $(SHARED_DEPS)
	@mkdir -p _site
	pandoc --defaults=defaults.yaml -s -o $@ $<

filter/filter.js: filter/package.json filter/package-lock.json
	cd filter && npm install

watch:
	@# If you save again faster than html was generated, make won't
	@# detect the change and will not run pandoc again. TODO look into pandoc-server.
	watchexec -w src -e md make -j2

clean:
	rm -rf _site
