FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build -- --configuration=development
FROM nginx:alpine AS serve

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/librarian-frontend/browser /usr/share/nginx/html

EXPOSE 80