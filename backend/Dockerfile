# Pull Docker Hub base image
FROM node:16.14.0-alpine as backend
RUN npm install -g nodemon

# Set working directory
WORKDIR /app
# Install app dependencies
COPY package.json .
RUN npm install

COPY . .
EXPOSE 3000
#RUN npm run dev
CMD ["npm", "run", "dev"]
