FROM node:7.8
EXPOSE 3000
ENV NODE_ENV production

RUN mkdir -p /srv/app
COPY . /srv/app

WORKDIR /srv/app

RUN npm install

CMD npm start
