FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} reparaciones-service.jar
ENTRYPOINT ["java","-jar","/reparaciones-service.jar"]