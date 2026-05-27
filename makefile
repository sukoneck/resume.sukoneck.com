.PHONY: dev dev-python dev-npx

PORT ?= 8000
DEV_IMPL ?= dev-npx

#
# In the search of the perfect one-liner...
#
dev: $(DEV_IMPL)

dev-npx:
	npx serve . -p $(PORT)

dev-python:
	python3 -m http.server $(PORT)
