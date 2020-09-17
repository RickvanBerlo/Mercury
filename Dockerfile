FROM adoptopenjdk/openjdk11:latest
ARG JAR_FILE=./api/target/api-1.0.0.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8393
ENTRYPOINT ["java","-jar","/app.jar"]
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar app.jar
