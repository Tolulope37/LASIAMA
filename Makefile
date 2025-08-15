up:
	docker compose up --build
down:
	docker compose down -v
api-dev:
	npm -w apps/api run dev
web-dev:
	npm -w apps/web run dev
