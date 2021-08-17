FROM node:latest

ENV USER rudefish

RUN useradd $USER

COPY ./flag3.txt /home/$USER/flag.txt

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

EXPOSE 3000
CMD [ "node", "dist/index.js" ]