FROM node:current-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add global rimraf

RUN yarn install

COPY . .

RUN yarn run prisma migrate deploy
RUN yarn run build

CMD ["node", "dist/main"]