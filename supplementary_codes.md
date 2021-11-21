# Coding Part

## Introduction

> nest new demoapp => Creates New Project \
> nest g class demo/dto/create-demo.dto --no-spec => Creates class under dto folder with no test file\
> nest g module demo => Creates Module\
> nest g s => Creates Service\
> nest g co demo => Create Controller

## Validation

> npm i class-validator class-transformer

## Mapping Types

> npm i @nestjs/mapped-types

## ORM with Postgres

> npm i @nestjs/typeorm typeorm pg

## ORM Migrations

> npx typeorm migration:create -n CoffeeRefactor => Creates migrations file for database (npx provides run executable packages from cli) \
> npx typeorm migration:run => Runs created migration \
> npx typeorm migration:revert => Reverts before migration \
> npx typeorm migration:generate -n SchemaSync => Generate migration

## Nestjs Config Manager

> npm i @nestjs/config

## Schema Validation

> npm i --save-dev @types/hapi\_\_joi

> We can bind Filters, Guards, Interceptors and Pipes as globally, in controllers or in methods. Pipes can additionally be binded as parameter. (Param)

## Generate Filters

> nest g filter common/filters/http-exception

## Generate Guards

> nest g guard common/guards/api-key

## Generate Interceptors

> nest g interceptor common/interceptors/wrap-response

## Generate Middleware

> nest g middleware common/middleware/logging

## Swagger

> npm i @nestjs/swagger swagger-ui-express
> In default, there is no swagger documentation generation automatically for parameters and objects, dtos. To activate swagger plugin, replace below code with `nest-cli.json `:

```javascript
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": ["@nestjs/swagger/plugin"]
  }
}
```

# Tests

> npm run test => for unit tests\
> npm run test:cov => for test coverage\
> npm run test:e2e => for e2e tests

## Samples

- Coffees Service Tests
  > npm run test:watch -- coffees.service

## e2e Samples

- Run All e2e Tests
  > npm run test:e2e
- Run Coffees Tests
  > npm run test:e2e -- coffees

> Use docker container for `test_db` connection and start it to port 5433. It is in docker-compose.yml file. After, add pretest and posttest special scripts to package.json to create and destroy `test_db` in docker.

```javascript
"pretest:e2e": "docker-compose up -d test_db",
"test:e2e": "jest --config ./test/jest-e2e.json",
"posttest:e2e": "docker-compose stop test_db && docker-compose rm -f test_db"
```
