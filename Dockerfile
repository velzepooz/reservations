# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/main

ENV NPM_CONFIG_LOGLEVEL warn
COPY package.json package-lock.json ./

RUN npm ci
COPY . .

# Stage 2: Run
FROM node:20-alpine

WORKDIR /usr/src/main

COPY --from=build /usr/src/main .

EXPOSE 80

CMD ["npm", "run", "start:prod"]
