pandoc = pandoc --webtex --lua-filter=ast-transforms.lua \
	--shift-heading-level-by=1 --css=style.css
pages = $(shell cd src; for i in *.org; do echo _site/$${i%%.*}.html; done)

.PHONY: all
all: $(pages) _site/style.css

_site/%.css: %.css Makefile
	cp $< $@

_site/%.html: src/%.org Makefile
	$(pandoc) -s -o $@ $<
	sed -i'.bck' 's,script \(.*mathjax\),script async \1,' $@
	rm $@.bck

# Local Variables:
# eval: (setq-default compilation-directory default-directory)
# eval: (add-hook 'after-save-hook (lambda () (save-window-excursion (recompile))))
# End:
