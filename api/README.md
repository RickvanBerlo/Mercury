This api is a RESTfull api in combination with a mongo database.   
It will be the backend for the project Mercury_Web
https://github.com/RickvanBerlo/Mercury_Web

# testing

The test environment will create a mongodb automaticly. there is no need to start a mongodb manually.  
Every endpoint in the Api will be tested with a intergration test.  
Go to http://localhost:8393/api/docs to see with endpoints this api supports.

# java dependencies

This project is using jdk 11 because of a deprecated dependencie of keycloak-spring-boot-starter. This will be fixed in version 12.

# authentication

This server is secured with keycloak. 

Go to https://github.com/RickvanBerlo/Mercury_Authentication for more information.

# containerize (docker)
this is a list of steps to containerize the apllication in docker.

## step: 1 (testing)
First of all test the application if there arent any bugs.  
Use the created unit test to validate all endpoints are working.  
Go to the folder api and use the command : "mvn test -P test".

## step: 2 (building jar)
After the first step execute the following command: "mvn package -DskipTests -P prod"

## step: 3 (build docker image)
Go one directory back with the command: "cd ..".  
Next use the following command: "docker build -t mercury/api ."

## step: 4 (docker-compose)
Now you will have a docker image with your application.  
To run the image use the command: "docker-compose up".  
Use "docker-compose up -d" if you want to start the docker container in the background.



