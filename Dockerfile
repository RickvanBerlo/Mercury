FROM jboss/keycloak:latest
ADD ./configuration/standalone.xml /opt/jboss/keycloak/standalone/configuration/standalone.xml

