FROM node:10-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 9443

CMD ["yarn","prod"]