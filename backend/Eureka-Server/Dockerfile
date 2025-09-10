# Étape 1 : Builder avec Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Répertoire de travail
WORKDIR /app

# Copier les fichiers Maven
COPY pom.xml .
COPY src ./src

# Compiler et créer le JAR
RUN mvn clean package -DskipTests

# Étape 2 : Image runtime légère
FROM eclipse-temurin:17-jdk-alpine

# Répertoire de travail
WORKDIR /app

# Copier le JAR depuis l'étape build
COPY --from=build /app/target/*.jar app.jar

# Exposer le port Eureka
EXPOSE 8761

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
