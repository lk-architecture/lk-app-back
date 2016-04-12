FROM node
MAINTAINER Paolo Scanferla <paolo.scanferla@gmail.com>

ADD . /lk-app-back
WORKDIR /lk-app-back
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
