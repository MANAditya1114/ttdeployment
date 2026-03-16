# ----------- BUILD STAGE -----------

# Use Maven image with JDK 21 to build the Spring Boot application
FROM maven:3.9.11-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot project folder from your repository into the container
# This folder contains pom.xml, src, and other project files
COPY Complaint_Management /app

# Run Maven build to compile the project and generate the JAR file
# -f specifies the pom.xml file location
# -DskipTests skips running tests to speed up the build
RUN mvn -f /app/pom.xml clean package -DskipTests


# ----------- RUNTIME STAGE -----------

# Use a smaller Java Runtime image to run the application
FROM eclipse-temurin:21-jre

# Set working directory inside the runtime container
WORKDIR /app

# Copy the generated JAR file from the build stage to this container
# This keeps the final image smaller because Maven is not included
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 so the container can receive requests
EXPOSE 8080

# Command to start the Spring Boot application
ENTRYPOINT ["java","-jar","app.jar"]