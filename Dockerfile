ARG NODE_VERSION=18.19.1

FROM node:${NODE_VERSION}-alpine

# ENV NODE_ENV production

WORKDIR /app

COPY package*.json .

RUN npm install
COPY . .

EXPOSE 3000

CMD npm start
