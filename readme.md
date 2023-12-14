docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

Acessar o container
docker exec -it pg bash

acessar o banco
psql -U root(nome do banco)

Criar database
CREATE DATABASE liveauth

factory pattern

curry - route adapter
