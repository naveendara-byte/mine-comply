# 1. Use Node.js image
FROM node:20-slim

# 2. Install pnpm (since you are using pnpm-lock.yaml)
RUN npm install -g pnpm

# 3. Set working directory
WORKDIR /app

# 4. Copy package files
COPY package.json pnpm-lock.yaml* ./

# 5. Install dependencies
RUN pnpm install

# 6. Copy the rest of your code
COPY . .

# 7. Expose port 8080 (Google Cloud standard)
EXPOSE 8080

# 8. Start the app (adjusting to your package.json start script)
CMD [ "pnpm", "start" ]
