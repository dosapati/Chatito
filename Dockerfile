FROM node:8.11.2

RUN apt-get update
RUN apt-get install -y libav-tools

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install


# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 5222
CMD [ "npm", "start" ]
