FROM ubuntu:22.04

ARG DOCKER_HOST_UID
ARG DOCKER_HOST_GID

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Set up some core packages
RUN apt-get update
RUN apt-get install -y sudo git curl

# Set up SSH access
RUN apt-get install -y openssh-server iptables
RUN mkdir /var/run/sshd
RUN groupadd -g $DOCKER_HOST_GID ubuntu
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -G ubuntu -u $DOCKER_HOST_UID ubuntu
RUN echo "ubuntu:password" | chpasswd

# Set up proper permissions for volumes
RUN mkdir -p /home/ubuntu/app /home/ubuntu/.vscode-remote /home/ubuntu/.vscode-server /home/ubuntu/.cache/JetBrains
RUN chown -R ubuntu /home/ubuntu

# Install Node.js 16 and packages needed to build native packages
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs gcc g++ make python3

CMD /usr/sbin/sshd -D -e
