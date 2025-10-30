FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the app source code
COPY . .

# Ensure nodejs user exists (optional, can also use default node user)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Fix permissions so nodejs user can write to /app
RUN chown -R nodejs:nodejs /app

# Switch to nodejs user
USER nodejs

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

