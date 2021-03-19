;; checkout this site with org mode
;; https://loomcom.com/blog/0110_emacs_blogging_for_fun_and_profit.html

(add-to-list 'load-path default-directory)
(require 'htmlize)

(require 'org)

(setq bouh/style "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\" />")
(setq bouh/source (concat default-directory "src"))
(setq bouh/site (concat default-directory "_site"))

(setq org-publish-project-alist
      `(("Bouh"
	 :components
	 ("org" "static"))
	("org"
	 :base-directory ,bouh/source
	 :base-extension "org"
	 :publishing-directory ,bouh/site
	 :publishing-function org-html-publish-to-html
	 :html-doctype "html5"
	 :html-head-extra ,bouh/style
	 :html-postamble nil
	 :auto-sitemap t
	 :sitemap-sort-files anti-chronologically
	 :sitemap-filename "index.org"
	 :sitemap-title "Bouh")
	("static"
	 :base-directory ,default-directory
	 :base-extension "css"
	 :publishing-directory ,bouh/site
	 :publishing-function org-publish-attachment)))

(setq make-backup-files nil)
(org-publish "Bouh")



;; (defun bouh/publish-file ()
;;   (save-excursion
;;     (org-publish-current-file)))
;; (add-hook 'before-save-hook 'bouh/publish-file)
