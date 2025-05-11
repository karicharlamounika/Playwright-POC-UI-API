# Use the official Playwright image with all dependencies installed
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Run Playwright install (ensure all browsers are installed)
RUN npx playwright install --with-deps

# Default command to run tests
CMD ["npx", "playwright", "test"]