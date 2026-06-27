FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install serve to run the built React app
RUN npm install -g serve

EXPOSE 8501

CMD ["serve", "-s", "dist", "-l", "8501"]
