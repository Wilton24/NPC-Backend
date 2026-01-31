FROM node:20-slim

# 2. Install build tools for native modules (bcrypt/pg)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 3. Set work directory
WORKDIR /app

# 4. Copy dependencies first (Optimization: keeps builds fast)
COPY package*.json ./

# 5. Install ALL dependencies (including devDependencies for TypeScript)
RUN npm install

# 6. Copy the rest of the source code
COPY . .

# 7. Expose your backend port
EXPOSE 5000

# 8. Run the dev script from your package.json
CMD ["npm", "run", "dev"]