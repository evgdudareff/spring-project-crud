FROM node:18-alpine

COPY public/ /react-docker/public
COPY src/ /react-docker/src
COPY package.json /react-docker/

WORKDIR /react-docker

RUN npm install

CMD ["npm", "start"]
