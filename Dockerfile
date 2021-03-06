FROM node:12.2.0

# set working directory
WORKDIR /pathfinder

# add `/app/node_modules/.bin` to $PATH
ENV PATH /pathfinder/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /pathfinder/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /pathfinder

# start app
CMD ng serve --host 0.0.0.0

