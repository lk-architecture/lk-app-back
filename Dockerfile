FROM node
MAINTAINER Paolo Scanferla <paolo.scanferla@gmail.com>

RUN apt-get update && apt-get install -y zip python-pip groff
RUN pip install awscli

ADD . /lk-app-back
WORKDIR /lk-app-back
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
