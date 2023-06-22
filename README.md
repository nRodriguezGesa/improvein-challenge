# Improvein Backend Challenge

## Como ejecutar el proyecto

1 - Correr docker compose. Esto levanta 1 contenedor con Nestjs y otro con MySQL

```
docker-compose up
```

2 - Ejecutar migrations de las bases de datos en el contenedor de NestJS debido a que no hay endpoints de creacion para todas las entidades

```
docker exec -it movies-challenge-nestjs-1 npm run migrate:up
```

## Probar el proyecto

Cuando se ejecuta el docker-compose, en la consola debera aparecer un link de localhost que lleva al Swagger.

Dentro de este, a traves de los endpoints de Auth se puede registrar un usuario y realizar login para obtener el access_token.

Luego, en la esquina superior derecha, habra un boton con el texto "Authorize" que permitira insertar el token jwt para poder usar
en el resto de los endpoints

##DER

En la raiz del proyecto, hay un archivo png que contiene el Diagrama Entidad Relacion con el modelado de la BD
