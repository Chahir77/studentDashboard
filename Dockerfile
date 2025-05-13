# Stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/defaut.conf
COPY --from=build /app/dist/student-dashboard /usr/share/nginx/html
EXPOSE 85



#FROM node:gallium-alpine3.18 as build
#WORKDIR /app
#COPY package.json .
#COPY package-lock.json .
#RUN npm install
#COPY . .
#RUN npm run build
#RUN npm run install-all

# Stage 2
#FROM nginx
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#RUN echo ${PWD} && ls -la
#COPY --from=build /app/build .
#ENTRYPOINT ["nginx", "-g", "daemon off;"]



# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
#FROM node:latest as build
# Set the working directory
#WORKDIR /usr/local/app
# Add the source code to app
#COPY ./ /usr/local/app/
# Install all the dependencies
#RUN npm install
# Generate the build of the application
#RUN npm run build
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
#FROM nginx:latest
# Copy the build output to replace the default nginx contents.
#COPY --from=build /usr/local/app/dist/StudentDashboard /usr/share/nginx/html
# Expose port 80
#EXPOSE 80


### STAGE 1: Build ###
#FROM node:18.19-alpine AS build
#WORKDIR /usr/src/app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build
### STAGE 2: Run ###
#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/StudentDashboard /usr/share/nginx/html
