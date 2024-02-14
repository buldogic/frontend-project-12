install:
	npm ci

install-frontend:
	make -C frontend install

lint-frontend:
	make -C frontend lint

build-frontend:
	make -C frontend build
	

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend
