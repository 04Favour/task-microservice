FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./
RUN npm ci
COPY apps ./apps
COPY libs ./libs
RUN npm run build email-consumer

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
USER node
COPY --from=builder /app/dist/apps/email-consumer ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3009
CMD ["node", "dist/main.js"]