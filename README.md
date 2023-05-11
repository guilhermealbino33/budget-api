# Run on localhost

## Create container image

docker-compose -f docker-compose-only-database.yml up --build

## Create table migration and create table on database

yarn migration:generate
yarn migration:run

## Swagger Documentation

http://localhost:3033/api-docs/

## Docker

If you are using docker, just follow the steps:
`docker-compose up --build`

### Warning

If you are using M1 or M2 put:
`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose up --build`

After start server:
`docker exec -it budget_api_app /bin/sh`

And just:

`yarn migration:generate`
`yarn migration:run`
