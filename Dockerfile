# pull official base image
FROM node:18.12-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent

# add app
COPY . ./

# run build stage
RUN npm run build

# web server
FROM nginx:stable-alpine as react-docker
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
