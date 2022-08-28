# Install Node Image
FROM node:16.14.0-alpine as client
# Working directory inside the container
WORKDIR /front
# Copy over the package.json files
COPY package.json /front
# Install dependencies
RUN yarn install --force

RUN npm install -g npm@8.18.0
RUN npm i react-scripts --force

# Copy everything
COPY . .
# Build the application
EXPOSE 3001
RUN yarn run build

CMD ["yarn", "start"]
