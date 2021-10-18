# Car Rent Backend App

## Prerequisites

You must have the following installed:

* [Node.js v14.17.6](https://nodejs.org/en/download/)
* NPM v6+
* Postgres v13
* Nest.js 8.1.3

## Environment variables 
 - CAR_RENT_BE_PORT 
 - CAR_RENT_DB_HOST
 - CAR_RENT_DB_PORT
 - CAR_RENT_DB_USER
 - CAR_RENT_DB_PASSWORD
 - CAR_RENT_DB_NAME

## Install Dependencies

Run `npm install` to install all dependencies from NPM.

## Database

```bash
# start database and services
$ docker-compose up -d
```

## Start an application

```bash
# start API
$ npm run start:dev
```