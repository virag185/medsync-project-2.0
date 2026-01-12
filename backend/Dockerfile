FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
# 1. Use Node.js official image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of backend code
COPY . .

# 6. Expose port
EXPOSE 3000

# 7. Start the server
CMD ["node", "server.js"]
