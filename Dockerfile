# --- Stage 1: Build Vite Frontend ---
FROM node:24-slim AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# Vite builds to the 'dist' folder by default
RUN npm run build 

# --- Stage 2: Setup Express Backend ---
FROM node:24-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app
COPY api/package*.json ./
RUN npm install 
COPY api/ ./

# Setup SQLite persistence
RUN mkdir -p /app/data
ENV DATABASE_URL=file:/app/data/dev.db

RUN npm run generate
RUN npm run build

# Copy the 'dist' folder from the build stage into the backend's public folder
COPY --from=build-frontend /app/frontend/dist ./public

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080
CMD ["node", "dist/main.js"]
