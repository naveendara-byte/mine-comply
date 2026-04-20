# 1. Use Node.js 20
FROM node:20-slim

# 2. Install pnpm globally
RUN npm install -g pnpm

# 3. Set the working directory
WORKDIR /app

# 4. Copy the workspace configuration and lock files
# This ensures pnpm knows it's a monorepo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# 5. Copy the package.json files from all sub-packages
# (This helps with caching so builds are faster)
COPY src/backend/package.json ./src/backend/
COPY src/frontend/package.json ./src/frontend/

# 6. Install all dependencies for the whole workspace
RUN pnpm install

# 7. Copy the rest of the source code
COPY . .

# 8. Run the build script defined in your package.json
# This will run 'pnpm -r run build' to build both frontend and backend
RUN pnpm run build

# 9. Expose port 8080 for Google Cloud
EXPOSE 8080

# 10. Start the application
# Note: You might need to adjust this depending on how Caffeine starts the server
CMD [ "pnpm", "start" ]
