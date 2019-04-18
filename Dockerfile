# => Build container
FROM node:8 as builder
WORKDIR /app
COPY package*.json ./
COPY tls-ca-bundle.pem .
RUN npm config set strict-ssl=false && \
    npm install --no-progress
COPY . .
RUN npm run build

# => Run container
FROM nginx:alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /app/public /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Initialize environment variables into filesystem
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Run script which initializes env vars to fs
RUN chmod +x env.sh
# RUN ./env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]