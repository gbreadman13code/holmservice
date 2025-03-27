# Сборка
FROM node:20-alpine AS build
WORKDIR /app
COPY ./front .
RUN npm ci && npm run build

# Простой сервер для прод-сборки
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
