FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} historial-service.jar
ENTRYPOINT ["java","-jar","/historial-service.jar"]