FROM node:16.18

ARG DOCKER_HOST_UID
ARG DOCKER_HOST_GID

# This custom Dockerfile is needed for the Node image so we can change the uid/gid used for the node user
# See https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
RUN groupmod -g "${DOCKER_HOST_GID}" node && usermod -u "${DOCKER_HOST_UID}" -g "${DOCKER_HOST_GID}" node

USER node
