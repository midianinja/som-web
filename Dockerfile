FROM node:10.15.3

ARG GRAPH_API_URI
ARG AUTH_API_URI
ARG STORAGE_API_URI
ARG REPOSITORY_URI
ARG INSTAGRAM_API_URI
ARG NODE_ENV

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