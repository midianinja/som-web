FROM node:10.15.3

RUN npm install -g webpack webpack-cli
WORKDIR /tmp

COPY package.json /tmp/

RUN npm config set registry http://registry.npmjs.org/ && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN cp -a /tmp/node_modules /usr/src/app/
RUN NODE_ENV=production webpack

ENV NODE_ENV=production
ENV PORT=8080

CMD ["npm", "start"]
EXPOSE 8080