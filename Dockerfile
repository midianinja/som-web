FROM node:10.16.3

# Environment variables
ARG NODE_ENV
ARG GRAPH_API_URI
ARG AUTH_API_URI
ARG STORAGE_API_URI
ARG INSTAGRAM_API_URI
ARG PORT

WORKDIR /home/node/app/

COPY package*.json /home/node/app/

RUN npm install
RUN npm install -g webpack webpack-cli

COPY . /home/node/app/
EXPOSE 8080

CMD ["npm", "start"]
