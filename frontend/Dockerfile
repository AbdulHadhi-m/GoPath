FROM node:22-alpine AS builder
ARG VITE_API_URL
ARG VITE_RAZORPAY_KEY_ID
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
