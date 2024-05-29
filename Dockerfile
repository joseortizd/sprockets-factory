FROM node:lts-alpine3.20
WORKDIR /app
COPY package.json .
RUN npm install --only-production
COPY . .
CMD ["npm", "start"]
