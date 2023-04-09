FROM node:16.18

COPY --chown=node:node . /home/node/bot

USER node
