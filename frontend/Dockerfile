# Étape unique — on ne reconstruit pas Angular ici
FROM nginx:alpine

# Supprimer la configuration par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier le build déjà fait par Jenkins
COPY frontend/dist/sakai-ng /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
