# Étape 1 : Builder l'application avec Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml et le code source
COPY pom.xml .
COPY src ./src

# Build du projet et création du JAR
RUN mvn clean package -DskipTests

# Étape 2 : Image runtime légère
FROM eclipse-temurin:17-jdk-alpine

# Répertoire de travail
WORKDIR /app

# Copier le JAR depuis l'étape build
COPY --from=build /app/target/*.jar app.jar

# Exposer le port défini dans ton application
EXPOSE 9094

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
