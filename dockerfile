# 1. Pick a base image with Node installed
# everything related to next js project build
 # builder stage

FROM node:20-alpine AS builder

 #  Set working directory in container
WORKDIR /app

# Copy package manifests & install dependencies
# asking docker to move the depedency file to root direction which is /app
COPY package.json package-lock.json ./

# Disable Next.js telemetry (removes the "# …" comments)
ENV NEXT_TELEMETRY_DISABLED=1

# install the deps 
RUN npm install 

# Copy source & build
COPY . .

# produces .next
RUN npm run build  

# 2) Production stage: serve with nginx 
# after build everything requried to run the app
# production stage
FROM nginx:alpine

# Remove default site
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/

# Copy static export from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port and launch nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]