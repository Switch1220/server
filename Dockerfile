FROM node:current-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN yarn install

COPY . .

RUN yarn run build

CMD ["node", "dist/main"]