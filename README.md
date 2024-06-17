# Reservations API

This application is designed to return reservations info and to parse CSV files with reservations data and to return it in JSON format.

## Features

- **REST API for reservations:** Allows users to retrieve reservations.
- **CSV files parsing:** Allows users to parse CSV files with reservations data and to return it in JSON format.
- **Swagger documentation:** Provides a Swagger documentation for the API.
- **Data seeding:** Seeds the database with sample data.
- **E2E tests:** Runs end-to-end tests to ensure that the API is working correctly.


## Technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Fastify](https://www.fastify.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Prerequisites

Before proceeding with the installation, ensure that the following prerequisites are met:

- **Node.js LTS (e.g., 20.x.x)**
- **Docker**

## Installation

Follow these steps to install the application:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/velzepooz/reservations
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd reservations
   ```

3. **Install Dependencies (for local development):**

   ```bash
   npm install
   ```

4. **Configure Environment Variables (or leave default values):**

   Configure an `.env` file in the root directory or leave default values.


## Demo

To start demo app, execute the following bash script `start_app.sh` or just run command:
```bash
docker compose --env-file .env up -d --build
```

This script will start a postgres container, apply all migrations and seeds, start the app in the background.
By default, the server will work on port 3000.
After starting the app, you can test the API using `Postman`, `Insomnia` or via cli:
```bash
curl -X GET http://localhost:3000/reservation/amenity/1/1593648000000
```

## Docs

You can find the Swagger documentation at `http://localhost:3000/docs`.

## Local development

For local development use the following commands:

```bash
# start postgres db in docker
docker-compose --env-file .env up -d --build postgres
```

```bash
# applies migrations and seeds
npm run typeorm:migration:run
```

```bash
# start the app in the development mode
npm run start:dev
```

## Tests

E2E tests are located in the `test` directory

To run e2e tests use the following commands:

```bash
# start postgres db in docker
docker-compose --env-file .env up -d --build postgres
```

```bash
# applies migrations
npm run typeorm:migration:run
```

```bash
npm run test
```
