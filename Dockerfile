FROM ubuntu:14.04
MAINTAINER Wattellina <wattelina@mondora.com>

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get update && apt-get install -y zip nodejs

RUN curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
RUN unzip awscli-bundle.zip
RUN ./awscli-bundle/install -b ~/bin/aws

ADD . /lk-app-back
WORKDIR /lk-app-back
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
