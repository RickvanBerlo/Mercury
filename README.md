# Mercury_Authentication
This repository contains the authentication server for all Mercury repositories.

This project is writen in Spring boot with the following dependencies:

* spring-boot-starter-data-jpa
* spring-boot-starter-web
* spring-cloud-starter-oauth2
* spring-boot-starter-thymeleaf
* spring-cloud-starter-security
* lombok
* mysql-connector-java

This oauth2 server accepts the following grant-types:

* authorization_code
* password
* refresh_token
* implicit
