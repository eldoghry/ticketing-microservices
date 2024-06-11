FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install --only=prod

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
