# Base image Nginx
FROM nginx:alpine

# Supprimer le contenu par défaut
RUN rm -rf /usr/share/nginx/html/*

# Détecter automatiquement le dossier Angular build dans dist/
# et le copier dans Nginx
ARG ANGULAR_DIST
COPY $ANGULAR_DIST/ /usr/share/nginx/html/

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx en avant-plan
CMD ["nginx", "-g", "daemon off;"]
