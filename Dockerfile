FROM node:19.2.0-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

ARG REACT_APP_CLIENT_ID

ENV REACT_APP_CLIENT_ID $REACT_APP_CLIENT_ID

ARG REACT_APP_HOST_URL

ENV REACT_APP_HOST_URL $REACT_APP_HOST_URL

RUN npm run build

RUN chmod 777 ./

CMD ["node", "server.js"]