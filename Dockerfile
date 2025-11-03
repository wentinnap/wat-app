# ====== Stage 1: Build Frontend ======
FROM node:18-alpine AS client-build
WORKDIR /app

# Copy client files
COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client ./client

# ให้สิทธิ์ run vite ได้
RUN chmod +x /app/client/node_modules/.bin/vite

# Build React (Vite)
RUN cd client && npm run build

# ====== Stage 2: Setup Server ======
FROM node:18-alpine AS server
WORKDIR /app

# Copy server files
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

COPY server ./server

# Copy built frontend to server public folder
COPY --from=client-build /app/client/dist ./server/public

WORKDIR /app/server

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "src/server.js"]
