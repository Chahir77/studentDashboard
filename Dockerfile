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