FROM node
FROM ubuntu:14.04
MAINTAINER Wattellina <wattelina@mondora.com>

RUN apt-get update && apt-get -y install zip curl
ADD . /lk-app-back
WORKDIR /lk-app-back
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
