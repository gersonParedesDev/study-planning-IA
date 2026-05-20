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
	cd apps/api && poetry run bash

shell-domain:
	cd domain && poetry run bash

shell-infra:
	cd infrastructure && poetry run bash

install:
	yarn install:all

test:
	yarn test:backend

# ---------------- DOCKER / DATABASE ----------------
# Inicia todo: Base de Datos y API
db:
	docker-compose up -d db minio
	@echo "Esperando a que la base de datos esté lista..."
	@sleep 3
	yarn api

# Solo detiene los contenedores
db-stop:
	docker-compose stop

# Acceso rápido a la consola de Postgres
db-shell:
	docker exec -it study_planning_db psql -U admin_user -d university_db
