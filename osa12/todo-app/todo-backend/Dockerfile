FROM node:16.13.0-alpine3.14

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN mkdir node_modules && chown -R node:node node_modules
COPY --chown=node:node . .
USER node

RUN npm ci --only=production

CMD npm start
