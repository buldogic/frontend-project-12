lint-frontend:
	make -C frontend lint

install:
	npm ci

build-frontend:
	make -C frontend build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend