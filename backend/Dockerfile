# VARS
ARG NODE_IMAGE=node:24.21.0-alpine

# BUILD STAGE
FROM ${NODE_IMAGE} AS builder

WORKDIR /app

# Shared config that backend/tsconfig.json references via "extends": "../tsconfig.json"
COPY tsconfig.json ./tsconfig.json

# From here on, work as if inside the backend/ folder
WORKDIR /app/backend

# Enables layer caching
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

# Copy sources after install — doesn't invalidate the npm ci cache
COPY backend/. .
RUN npm run build

# RUNTIME STAGE
FROM ${NODE_IMAGE}

WORKDIR /app

# Fallback for running this image without an orchestrator (e.g. plain `docker run`);
ENV NODE_ENV=production
ENV PORT=8080

COPY backend/package.json backend/package-lock.json ./
# Skip dev deps, skip the "prepare": "husky"
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Grab only the built bundle from builder
COPY --from=builder /app/backend/dist ./dist

# Run as an unprivileged user (by default is root user)
USER node

# Fallback for running this image without an orchestrator (e.g. plain `docker run`);
EXPOSE 8080

# Start the compiled app
CMD ["node", "dist/main"]
