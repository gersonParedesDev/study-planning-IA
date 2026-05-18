.PHONY: api web dev shell install test setup help

help:
	@echo "Available commands:"
	@echo "  make api     - Start the FastAPI backend"
	@echo "  make web     - Start the Frontend"
	@echo "  make dev     - Start both Frontend and Backend"
	@echo "  make shell   - Open the API virtual environment shell"
	@echo "  make install - Install all dependencies (Python + Frontend)"
	@echo "  make test    - Run backend tests"

api:
	yarn api

web:
	yarn web

dev:
	yarn dev

shell:
	cd apps/api && poetry shell

install:
	yarn install:all

test:
	yarn test:backend
