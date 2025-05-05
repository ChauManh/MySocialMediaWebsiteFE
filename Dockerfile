# Bước 1: Build ứng dụng bằng Node.js
FROM node:18-alpine AS build

WORKDIR /app

# Cho phép truyền biến môi trường khi build
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL

# Cài đặt thư viện
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Build production 
RUN npm run build

# Bước 2: Dùng Nginx để serve build
FROM nginx:alpine

# Copy file config Nginx nếu có
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy build vào thư mục public của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
