# Run on localhost

## Create container image

docker-compose build
docker-compose up

## Create table migration and create table on database

yarn migration:generate
yarn migration:run
