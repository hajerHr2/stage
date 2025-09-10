# Étape 1 : Builder l'application avec Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copier pom.xml et le code source
COPY pom.xml .
COPY src ./src

# Compiler le projet et créer le JAR
RUN mvn clean package -DskipTests

# Étape 2 : Image runtime légère
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copier le JAR généré
COPY --from=build /app/target/*.jar app.jar

# Exposer le port de ton microservice
EXPOSE 8089

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
