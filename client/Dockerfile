# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve static files
FROM node:18-alpine
WORKDIR /app

# Install lightweight static server
RUN npm install -g serve

# Copy build output only
COPY --from=builder /app/build ./build

# Run as non-root
USER node

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]

