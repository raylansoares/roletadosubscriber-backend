FROM mhart/alpine-node:12

WORKDIR /app

CMD [ "npm","run", "dev" ]