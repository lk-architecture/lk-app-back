FROM ubuntu:14.04
MAINTAINER Wattellina <wattelina@mondora.com>

RUN apt-get update && apt-get -y install zip curl build-essential libssl-dev
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
RUN nvm install 5.8.0
RUN nvm use 5.8.0

ADD . /lk-app-back
WORKDIR /lk-app-back
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
