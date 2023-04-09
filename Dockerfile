FROM node:16.18

ARG HOST_USER_UID
ARG HOST_USER_GID

# This custom Dockerfile is needed for the Node image so we can change the uid/gid used for the node user
# See https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
RUN groupmod -g "${HOST_USER_UID}" node && usermod -u "${HOST_USER_UID}" -g "${HOST_USER_GID}" node

USER node
