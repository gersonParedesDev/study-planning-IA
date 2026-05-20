# 🚀 Study Planning IA - Quickstart Guide

This guide summarizes the commands and configurations for the project.

## 🛠 Shortcuts (Makefile)
Always run these from the **root folder**:

| Command | Description |
| :--- | :--- |
| `make db` | **Start everything**: Starts Docker (Postgres/MinIO) + API. |
| `make db-stop` | Stop Docker containers. |
| `make db-shell` | Open PostgreSQL console directly inside Docker. |
| `make dev` | Start both Frontend and Backend (API) simultaneously. |
| `make api` | Start only the FastAPI backend. |
| `make web` | Start only the React frontend. |
| `make shell` | Enter the API virtual environment. |
| `make shell-domain` | Enter the Domain virtual environment. |
| `make shell-infra` | Enter the Infrastructure virtual environment. |
| `make install` | Install all dependencies (Python + Node.js) everywhere. |
| `make test` | Run all backend tests. |

---

## 📦 Monorepo Structure & Environments
The project is split into layers. You can run `yarn` commands from the root:

*   **API (Backend):** `yarn api`
*   **Frontend:** `yarn web`
*   **Unit Tests:** `yarn test:backend`
*   **Full Install:** `yarn install:all`

---

## 🐳 Docker & Ports
| Service | External Port | Internal Port | Description |
| :--- | :--- | :--- | :--- |
| **FastAPI** | `8000` | `8000` | Backend API (uvicorn) |
| **PostgreSQL** | `5433` | `5432` | Main Database |
| **MinIO** | `9000` | `9000` | File Storage (S3 API) |
| **MinIO Console**| `9001` | `9001` | Storage Web Dashboard |
| **Frontend** | `5173` | `5173` | React / Vite Dashboard |

---

## 🔑 Database Configuration (.env)
The API is currently configured to use **PostgreSQL** in Docker:
- **DB_HOST:** `localhost`
- **DB_PORT:** `5433`
- **DB_USER:** `admin_user`
- **DB_PASSWORD:** `secret_password`
- **DB_NAME:** `university_db`

---

## 🐍 Manual Venv Activation
If you need to activate a virtual environment manually in your terminal:

1. **New Poetry Way:** `cd apps/api && eval $(poetry env activate)`
2. **Standard Way:** `source apps/api/.venv/bin/activate`
