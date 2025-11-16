SHELL = /bin/bash

before_date := $(shell date -d "20 days ago" +"%Y-%m-%d")

override JAIL := firejail --seccomp --noroot --nosound --novideo --no3d --caps.drop=all --hostname=develop --private=./
override NPM  := $(JAIL) npm

# Linux commands
install:
	$(NPM) install --before $(before_date)

add:
	$(NPM) install --before $(before_date) $(ARGS)

remove:
	$(NPM) remove $(ARGS)

ci:
	$(NPM) ci

dev:
	$(NPM) run dev -- $(ARGS)

start:
	$(NPM) start

build:
	$(NPM) run build

audit:
	$(NPM) audit

outdated:
	$(NPM) outdated

lint:
	$(NPM) run lint $(ARGS)
