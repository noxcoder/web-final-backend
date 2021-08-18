FROM node:latest

ENV USER rudefish

RUN useradd $USER

COPY ./fakeflag.txt /home/$USER/flag.txt

RUN mkdir -p /opt/secretkeepers/info
COPY ./flag3.txt /opt/secretkeepers/info/information.txt

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install
RUN rm -rf Dockerfile flag3.txt fakeflag.txt env.list

EXPOSE 3000
CMD [ "node", "dist/index.js" ]