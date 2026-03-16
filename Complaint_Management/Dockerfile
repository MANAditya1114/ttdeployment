# -------- BUILD STAGE --------
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /app

# Copy all project files
COPY . .

# Build Spring Boot jar
RUN mvn clean package -DskipTests


# -------- RUNTIME STAGE --------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run Spring Boot
ENTRYPOINT ["java","-jar","app.jar"]