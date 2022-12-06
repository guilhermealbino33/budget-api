FROM node

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./

RUN yarn

RUN npm install html-pdf -g
RUN npm link html-pdf
RUN npm link phantomjs-prebuilt

COPY . .

EXPOSE 3033

CMD ["yarn", "dev"]