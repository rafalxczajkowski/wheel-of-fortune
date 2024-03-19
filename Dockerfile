ARG NODE_VERSION=18.19.1

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production
ENV MONGO_URI mongodb+srv://rafal:zwyklaSwinia_@mycluster.idj3se9.mongodb.net/WheelOfFortune?retryWrites=true&w=majority

WORKDIR /app

COPY package*.json .

RUN npm install
COPY . .

EXPOSE 3000

CMD npm start
