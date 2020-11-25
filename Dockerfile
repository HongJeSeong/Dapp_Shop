FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update
RUN apt -y install apache2 git vim build-essential
RUN apt install -y nodejs
RUN apt install -y npm
RUN npm install -g npm
RUN npm install -y ejs
RUN npm install -g express
RUN npm install -g truffle
RUN npm install @truffle/contract
RUN npm install -g ganache-cli
RUN npm install -g mysql
RUN npm install multer

WORKDIR /usr/
COPY src /usr/src

EXPOSE 8545
EXPOSE 3000
EXPOSE 4000
EXPOSE 3306

WORKDIR /usr/src/app
RUN npm install
RUN npm i jquery --save

CMD ./start.sh

