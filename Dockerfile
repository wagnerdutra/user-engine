FROM node:10-slim

ENV HOME=/home/app

COPY package.json $HOME/node_docker/

WORKDIR $HOME/node_docker

RUN yarn && yarn cache clean

COPY . $HOME/node_docker

CMD ["yarn","start"]

EXPOSE 9443
