FROM --platform=linux/amd64 docker

RUN apk update && \ 
    apk add tzdata && \
    apk add nodejs npm  && \
    apk add openssl
# Change TimeZone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ARG HOME=/home/node

ENV NPM_CONFIG_PREFIX=$HOME/.npm-global
ENV PATH=$PATH:$HOME/.npm-global/bin

RUN mkdir -p $HOME/web
WORKDIR $HOME/web

COPY --chown=node:node ./package.json ./
RUN npm install

COPY --chown=node:node ./ ./
RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run tsc

CMD [ "npm", "run", "docker" ]