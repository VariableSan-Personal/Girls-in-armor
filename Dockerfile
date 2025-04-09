# Use Node.js Alpine for build stage with all dev tools
FROM node:22.12.0-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies using clean install for reproducibility
RUN npm ci

# Copy entire project to container
COPY . .

# Build the Nuxt application
RUN npm run build

# Use distroless Node.js image for production for minimal, secure runtime
FROM node:22.12.0-alpine AS prod

# Set working directory in production container
WORKDIR /app

# Copy built output from build stage to production container
COPY --from=build /app/.output ./.output

# Expose port the app will run on
EXPOSE 3002

# Command to start the Nuxt server from built output
CMD ["./.output/server/index.mjs"]
