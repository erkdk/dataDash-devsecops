FROM node:18-alpine
WORKDIR /app

# Copy dependency manifests first
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Use built-in "node" user (exists in node:alpine)
USER node

EXPOSE 5000
CMD ["npm", "start"]

