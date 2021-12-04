FROM node:12.8.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY index.js ./

CMD node index.js