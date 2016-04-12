FROM ubuntu:14.04
MAINTAINER Wattellina <wattelina@mondora.com>

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get update && apt-get install -y curl build-essential zip nodejs python-pip groff

RUN pip install awscli

ADD . /lk-app-back
WORKDIR /lk-app-back
CMD ["npm", "install"]

EXPOSE 3000
CMD ["npm", "start"]
