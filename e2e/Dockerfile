FROM node:latest AS node_base

WORKDIR /app

#check the node and npm
RUN echo "NODE Version: " && node --version
RUN echo "NPM: " && npm --version

# install the required dependencies for cypress
RUN apt-get update -y
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
RUN apt-get install vim -y

# install cypress as global
RUN npm i -g cypress
RUN echo "CYPRESS version: " && cypress --version

# verify cypress
RUN cypress verify

#"baseUrl": "https://qa5848de7-web.rgtests.com",

# Install x11vnc.
RUN apt-get install -y x11vnc
# Install xvfb.
RUN apt-get install -y xvfb
# Install fluxbox.
RUN apt-get install -y fluxbox
# Install wget.
RUN apt-get install -y wget
# Install wmctrl.
RUN apt-get install -y wmctrl
# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

RUN google-chrome --version

COPY . .
RUN ls

# Make sure that Xvfb starts every time the docker built
RUN Xvfb -ac :99 -screen 0 1280x1024x16 &
RUN export DISPLAY=:99