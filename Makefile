.PHONY: default
default: deploy ;


.PHONY : deploy
deploy:
	# Temporarily create a git repo with remote pointing to the FE repo,
	#  force-push this dir and finally destroy the local git (deleting the .git dir).
	git init .
	git remote add origin git@github.com:puntonim/qd.git
	git branch -M main
	git add .
	git commit -m "feat: frontend"
	git push -u origin main -f
	rm -rf .git
