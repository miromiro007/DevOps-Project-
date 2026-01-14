FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --prefer-offline --no-audit --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
