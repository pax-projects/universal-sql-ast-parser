TS_NODE = npx ts-node
TSC = npx tsc
NODE = node
SRC = src/index.ts
DIST = dist/index.js
ESLINT = npx eslint

.PHONY: all dev build start lint lint-fix check-types clean

all: check-types lint start

dev:
	$(TS_NODE) $(SRC)

build:
	$(TSC)

start: build
	$(NODE) $(DIST)

lint:
	$(ESLINT) 'src/**/*.{ts,js}'

lint-fix:
	$(ESLINT) 'src/**/*.{ts,js}' --fix

check-types:
	$(TSC) --noEmit

clean:
	rm -rf dist
