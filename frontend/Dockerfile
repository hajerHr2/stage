# Base image Nginx
FROM nginx:alpine

# Supprimer le contenu par défaut du dossier HTML
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Angular
ARG ANGULAR_DIST
COPY $ANGULAR_DIST/ /usr/share/nginx/html/

# ⚠️ Copier nginx.conf comme fichier principal
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx en avant-plan
CMD ["nginx", "-g", "daemon off;"]
