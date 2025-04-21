# Bước 1: Sử dụng Node.js để build ứng dụng
FROM node:18-alpine AS build

# Cài đặt thư viện
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy mã nguồn
COPY . .

# Build ứng dụng với Vite
RUN npm run build

# Bước 2: Sử dụng Nginx để serve ứng dụng
FROM nginx:alpine

# Copy build từ bước trước vào thư mục được phục vụ bởi Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose cổng 80 để có thể truy cập ứng dụng từ bên ngoài
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
