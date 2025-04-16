FROM node:18

WORKDIR /app

# Install Python and dependencies
RUN apt-get update && apt-get install -y python3 python3-pip

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy Python requirements
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

# Copy the rest of the code
COPY . .

# Make Python scripts executable
RUN chmod +x *.py

# Expose the port
EXPOSE 3005

# Start the server
CMD ["node", "server.js"] 