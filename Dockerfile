FROM node:19.2.0-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

RUN chmod 777 ./

CMD ["node", "server.js"]