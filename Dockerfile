FROM node:7.8-alpine
EXPOSE 3000
ENV NODE_ENV production

RUN apk add --update \
    python \
    make \
    g++

RUN mkdir -p /srv/app
COPY . /srv/app

WORKDIR /srv/app

RUN npm install

CMD npm start

