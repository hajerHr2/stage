FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# On suppose que Jenkins a déjà fait "ng build" dans frontend/dist/frontend/
ARG ANGULAR_DIST=frontend/dist/frontend
COPY ${ANGULAR_DIST}/ /usr/share/nginx/html/

COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
