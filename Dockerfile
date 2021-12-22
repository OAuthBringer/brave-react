FROM node:17.3-alpine

EXPOSE 2222

RUN mkdir -p /var/www/
WORKDIR /var/www/
COPY swapi .
RUN rm -rf node_modules
RUN npm install
CMD npm start -p 2222
