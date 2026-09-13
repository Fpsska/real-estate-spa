ARG NODE_IMAGE=node:24.21.0-alpine
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.30.4-alpine3.24

# BUILD STAGE
FROM ${NODE_IMAGE} AS builder

WORKDIR /app

# Shared config that frontend/tsconfig.json references via "extends": "../tsconfig.json"
COPY tsconfig.json ./tsconfig.json

WORKDIR /app/frontend

# Enables layer caching
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy sources after install — doesn't invalidate the npm ci cache
COPY frontend/. .
RUN npm run build:docker

# NGINX STAGE
FROM ${NGINX_IMAGE}

# Grab only the built bundle from builder
COPY --from=builder /app/frontend/build /usr/share/nginx/html
# Set custom nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
