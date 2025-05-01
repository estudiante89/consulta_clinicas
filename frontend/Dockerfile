
# Use official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 4200

# Run the application
CMD ["npm", "run", "start"]
