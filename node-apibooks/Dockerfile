FROM node:20-slim

WORKDIR /app

# Installation de curl pour le healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --only=production

COPY . .


EXPOSE 3000

CMD ["npm", "start"]
