FROM maven:3.9.16-eclipse-temurin-17 AS build

WORKDIR /workspace
COPY pom.xml ./
COPY .mvn/settings.xml .mvn/settings.xml
COPY src/ src/
RUN mvn -s .mvn/settings.xml -B -ntp package -DskipTests

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=prod
COPY --from=build /workspace/target/campusflow-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app/app.jar"]