DC := docker-compose exec express
CONTAINER_NAME := express
ARG := $1
# ======================================================
# docker cmd
# ======================================================
system-prune: # remove unused docker obj
	docker system prune

image-prune: # remove unused docker imgae
	docker image prune

# =======================================================
# docker-compose cmd
# =======================================================
up:
	docker-compose up -d --build
	make yarn-start

down:
	docker compose down

stop:
	docker-compose stop

restart:
	docker-compose down
	docker-compose up -d


destroy:
	docker-compose down --rmi all --volumes

ps:
	docker-compose ps

express:
	docker-compose exec ${CONTAINER_NAME} /bin/ash


# =======================================================
# yarn cmd
# =======================================================
yarn-install:
	docker-compose exec ${CONTAINER_NAME} yarn install

yarn-start:
	docker-compose exec ${CONTAINER_NAME} yarn start

yarn-build:
	docker-compose exec ${CONTAINER_NAME} yarn build

add:
	docker-compose exec ${CONTAINER_NAME} yarn add ${ARG}

storybook:
	docker-compose exec ${CONTAINER_NAME} yarn storybook
# =======================================================
# setup
# =======================================================
install-react-app:
	docker-compose exec ${CONTAINER_NAME} yarn
	docker-compose exec ${CONTAINER_NAME} npx create-react-app frontend --template typescript
	cp -R frontend/. ./
	rm -rf frontend
	docker-compose exec ${CONTAINER_NAME} yarn build
	docker-compose exec ${CONTAINER_NAME} yarn start	

api:
	yarn generate:api-client

install:
	# cp .env.local.sample .env.local
	# cp .env.sample .env
	docker-compose up -d --build
	docker-compose exec ${CONTAINER_NAME} yarn
	docker-compose exec ${CONTAINER_NAME} yarn build
	docker-compose exec ${CONTAINER_NAME} yarn start	