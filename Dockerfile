FROM node:12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#RUN npm install -g nodemon

COPY package*.json ./
RUN npm ci --only=production

COPY . /usr/src/app

EXPOSE 8888

CMD ["npm", "start"]
