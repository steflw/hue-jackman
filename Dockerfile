FROM node:9.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build
RUN npm prune --production

EXPOSE 8080

CMD ["npm","start"]