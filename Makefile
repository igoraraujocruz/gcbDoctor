.PHONY: start database build-migrations migrations destroy build-application run-tests run-migrations

start:
	@docker-compose up server

database:
	@docker-compose up -d postgres

build-migrations:
	@docker-compose build migrations

migrations:
	@docker-compose up --exit-code-from migrations migrations

destroy:
	@docker-compose down -v --rmi local

build-application:
	@docker-compose build

run-tests: build-tests tests-development

run-migrations: build-migrations migrations
