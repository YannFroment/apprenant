# Executables (local)
DOCKER_COMP = docker-compose

# Docker containers
FRONTEND_RUN = $(DOCKER_COMP) run --rm frontend
BACKEND_RUN = $(DOCKER_COMP) run --rm backend

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

# General commands

up: ## Launch docker services
	@$(DOCKER_COMP) up

frontend-install: ## Install packages for the frontend
	@$(FRONTEND_RUN) npm install

backend-install: ## Install packages for the backend
	@$(BACKEND_RUN) npm install

setup: ## Install packages for frontend and backend, then run migrations
	make frontend-install && make backend-install && make migration-run

# Lint commands

frontend-lint: ## Lint the frontend
	@$(FRONTEND_RUN) npm run lint

backend-lint: ## Lint the backend
	@$(BACKEND_RUN) npm run lint

# Test commands

frontend-test: ## Unit tests for the frontend
	@$(FRONTEND_RUN) npm run test

backend-test: ## Unit tests for the backend
	@$(BACKEND_RUN) npm run test

backend-test-e2e: ## Unit tests for the backend
	@$(BACKEND_RUN) npm run test:e2e

# Database commands

migration-run: ## Run the database migrations
	@$(BACKEND_RUN) npm run migration:run

migration-generate: ## Generate a migration file based on the schemas changes. Example: make migration-generate name=<MigrationName>
	@$(BACKEND_RUN) npm run typeorm migration:generate ./src/persistence/migrations/$(name)

purge-db: ## Drop the database, run the migrations and run the seeders
	@$(BACKEND_RUN) npm run purge:db

# Build commands

frontend-build: ## Build the frontend
	@$(FRONTEND_RUN) npm run build

backend-build: ## Build the backend
	@$(BACKEND_RUN) npm run build
