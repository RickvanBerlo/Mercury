This api is a RESTfull api in combination with a mongo database. <br/> 
It will be the backend for the project Mercury_Web
https://github.com/RickvanBerlo/Mercury_Web

# testing

the test environment will create a mongodb automaticly. there is no need to start a mongodb manually.

Every endpoint in the Api will be tested with a intergration test

Go to http://localhost:8393/api/docs to see with endpoints this api supports.

# java dependencie

this project is using jdk 11 because of a deprecated dependencie of keycloak-spring-boot-starter. This will be fixed in version 12.

# authentication

This server is secured with keycloak. 

Go to https://github.com/RickvanBerlo/Mercury_Authentication for more information.
