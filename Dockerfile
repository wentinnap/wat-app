# ---------- Build client ----------
FROM node:20 AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ---------- Install server deps ----------
FROM node:20 AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev

# ---------- Final image ----------
FROM node:20
WORKDIR /app/server

# Copy server code
COPY server/ ./

# Copy built client into server/public
COPY --from=client-builder /app/client/dist ./public

# Copy server node_modules
COPY --from=server-deps /app/server/node_modules ./node_modules

EXPOSE 4000
CMD ["node","src/server.js"]
