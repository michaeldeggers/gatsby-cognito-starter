# => Build container
FROM node:8 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-progress
COPY . .
RUN npm run build

# => Run container
FROM nginx:latest

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

### Setup user for build execution and application runtime
ENV APP_ROOT=/opt/app-root
ENV PATH=${APP_ROOT}/bin:${PATH} HOME=${APP_ROOT}
COPY bin/ ${APP_ROOT}/bin/
RUN chmod -R u+x ${APP_ROOT}/bin  && \
    chgrp -R 0 ${APP_ROOT} /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g=u ${APP_ROOT} /etc/passwd /var/cache/nginx /var/run /var/log/nginx

### Containers should NOT run as root as a good practice
USER 10001
WORKDIR ${APP_ROOT}

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

# Static build
COPY --from=builder /app/public /usr/share/nginx/html/

ENTRYPOINT [ "uid_entrypoint" ]
# Start Nginx server
CMD ["nginx","-g","daemon off;"]