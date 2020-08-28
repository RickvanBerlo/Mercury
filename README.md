This server will authenticate all other (code_name)mercury application.

This server uses Keycloak as its authentication server.

In the map CustomTheme is a new theme written for all mercury applications.

# execute

To execute this server you will need to install the following dependecies

* docker
* docker-compose

in the root folder of this project use the command: docker-compose up -d

This will start the services Keycloak and postgres DB.


# edit custom theme
if you want to added the custom theme, you will need to disable chaching in keycloak. To disable this you can you the dockerfile in the root folder.

build a new image from the dockerfile with the following commando: docker build --tag disableChacheInKeycloak:latest

Next edit the docker-compose file on line:18 and change it to disableChacheInKeycloak:latest

now use the execute steps to run the docker-compose file.
