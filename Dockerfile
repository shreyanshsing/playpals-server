# Use Node.js base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
RUN npm install dotenv-cli --save-dev

# Copy the entire project directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose both HTTP and WebSocket ports
EXPOSE 3030 5432

# Run Prisma Migrate
RUN npx prisma migrate deploy

# Generate Prisma Client
RUN npx prisma generate dev

# Run the application
CMD ["npm", "start"]
