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
WORKDIR /app
COPY api/package*.json ./
RUN npm install 
COPY api/ ./

RUN npm run generate
RUN npm run build

# Copy the 'dist' folder from the build stage into the backend's public folder
COPY --from=build-frontend /app/frontend/dist ./public

# Setup SQLite persistence
RUN mkdir -p /app/data
ENV DB_PATH=/app/data/dev.db
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080
CMD ["node", "dist/main.js"]
