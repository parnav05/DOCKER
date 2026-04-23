FROM ubuntu:latest

WORKDIR /app 

COPY . .

RUN  apt update && apt install -y curl


COPY . . 


CMD  echo "hello from container "
