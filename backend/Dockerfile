FROM node:22-alpine AS deps
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ .
EXPOSE 5000
USER node
CMD ["node", "src/server.js"]
