FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM node:16 AS build-stage

COPY --from=test-stage /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL = ${REACT_APP_BACKEND_URL}

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html


