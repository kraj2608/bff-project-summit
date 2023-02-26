FROM node:lts-alpine

WORKDIR /user/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf src

CMD [ "node","dist/index.js" ]