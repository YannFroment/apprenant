# Executables (local)
DOCKER_COMP = docker-compose

# Docker containers
FRONTEND_RUN = $(DOCKER_COMP) run --rm frontend
BACKEND_RUN = $(DOCKER_COMP) run --rm backend

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

up: ## Launch docker services
	@$(DOCKER_COMP) up

frontend-install: ## Install packages for the frontend
	@$(FRONTEND_RUN) npm install

backend-install: ## Install packages for the backend
	@$(BACKEND_RUN) npm install

install: # Install packages for frontend and backend
	make frontend-install && make backend-install
