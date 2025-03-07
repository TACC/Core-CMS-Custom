DOCKERHUB_REPO := $(shell cat ./docker_repo.var)
DOCKER_TAG ?= $(shell git rev-parse --short HEAD)
DOCKER_IMAGE := $(DOCKERHUB_REPO):$(DOCKER_TAG)
DOCKER_IMAGE_LATEST := $(DOCKERHUB_REPO):latest
DOCKER_COMPOSE_CMD := $(shell if command -v docker-compose > /dev/null; then echo "docker-compose"; else echo "docker compose"; fi)

# `DOCKER_IMAGE_BRANCH` tag is the git tag for the commit if it exists, else the branch on which the commit exists
DOCKER_IMAGE_BRANCH := $(DOCKERHUB_REPO):$(shell git describe --exact-match --tags 2> /dev/null || git symbolic-ref --short HEAD)

#.PHONY: build
build:
	$(DOCKER_COMPOSE_CMD) -f docker-compose.dev.yml build

.PHONY: build-full
build-full:
	docker build -t $(DOCKER_IMAGE) --target production -f Dockerfile .
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_BRANCH) # Note: Currently broken for branches with slashes

.PHONY: publish
publish:
	docker push $(DOCKER_IMAGE)
	docker push $(DOCKER_IMAGE_BRANCH)

.PHONY: publish-latest
publish-latest:
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_LATEST)
	docker push $(DOCKER_IMAGE_LATEST)

.PHONY: start
start:
	$(DOCKER_COMPOSE_CMD) -f docker-compose.dev.yml up

.PHONY: stop
stop:
	$(DOCKER_COMPOSE_CMD) -f docker-compose.dev.yml down

.PHONY: stop-full
stop-v:
	$(DOCKER_COMPOSE_CMD) -f docker-compose.dev.yml down -v
