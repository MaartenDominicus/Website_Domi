FROM node:22-bookworm-slim AS build
WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:pages

FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/dist/legacy-redirects.conf /etc/nginx/legacy-redirects.conf
COPY --from=build /site/out/ /usr/share/nginx/html/
EXPOSE 80
