# ----------- BUILD STAGE -----------

# Use Maven with JDK 21 to build the Spring Boot application
FROM maven:3.9.11-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy the Spring Boot project folder
COPY Complaint_Management /app

# Build the jar file
RUN mvn -f /app/pom.xml clean package -DskipTests


# ----------- RUNTIME STAGE -----------

# Use lightweight Java runtime
FROM eclipse-temurin:21-jre

# Working directory
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run application
ENTRYPOINT ["java","-jar","app.jar"]