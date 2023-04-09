docker compose -f docker-compose.production.yml down
git pull
docker compose -f docker-compose.production.yml build
docker compose -f docker-compose.production.yml up
