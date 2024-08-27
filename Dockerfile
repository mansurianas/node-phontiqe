# Use a lightweight Node.js image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files for npm install
COPY . .
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
