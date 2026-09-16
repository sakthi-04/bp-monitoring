# Use Java 17
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Give Maven wrapper execute permission
RUN chmod +x mvnw

# Download dependencies and build the application
COPY src src
RUN ./mvnw clean package -DskipTests

# Run the Spring Boot application
CMD ["sh", "-c", "java -jar target/*.jar"]