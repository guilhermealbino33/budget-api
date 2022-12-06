FROM node

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3033

CMD ["yarn", "dev"]