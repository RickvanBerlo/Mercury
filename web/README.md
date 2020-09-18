# dependencies
*   "react": "16.12.0",
*   "react-dom": "16.12.0",
*   "react-ionicons": "^3.1.4",
*   "react-quill": "^1.3.5",
*   "react-redux": "^7.2.1",
*   "react-router-dom": "^5.1.2",
*   "react-scripts": "^3.4.1",
*   "react-scroll-parallax": "^2.3.2",
*   "react-transition-group": "^4.4.1",
*   "redux": "^4.0.5",
*   "redux-logger": "^3.0.6",
*   "redux-promise-middleware": "^6.1.2",
*   "redux-thunk": "^2.3.0",
*   "styled-components": "^4.4.1"

# structure

this application is seperated in differend folder.

### assets

this folder stores all static content like images and documents

### components

this folder contains all the components of this applications. pages can use these components to add extra features.

### constants

constants contains all variable for colors pages and a lot more.

### css

contains all css file where styled components could not be used.

### database

all request to the api. all request are build by a custom requestbuilder in the utils folder.

### pages

these are all the views a user can see.

### routes

here are all the routes defined that the application has used

### stores

here reduc stores are stored. this will store all data of the application.

### utils

contains all helper classes this application uses.

# Creating pages
For creating a page you will need to execute the following intructions.

1. Create .js file
2. add route
    * edit config/pages.js //public
    * edit routes/routes.js //private

### `Template.js File`
Down below you can see a template for creating a page. Copy and past this template in your new .js file and change the names "template" to your custom name.

```
import React, { memo } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

const Template = ({}) => {
    return (
        <Container>
            <Text>Template</Text>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const Text = styled.p`
    margin: 0
`
const areEqual = (prevProps, nextProps) => {
    return true;
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
}

const MemoTemplate = memo(connect(mapStateToProps, mapDispatchToProps)(Template), areEqual)
export default MemoTemplate;
```

### `config/pages.js #private`
Add the name of your page to the hasmap pageNames.

```
export const pageNames = {
    TEMPLATE: "Template",
}
```

After you have edited your name in pageNames, you will need to add your page name to the hashmap pages.

```
export const pages = {
    "Template": { PAGE: TemplatePage, ICON: *optional* },
}
```

If you want your page to bee included in the sideMenu you need to include a icon. Else you can leave ICON empty.

### `routes/routes.js #public`
Add the following line to the switch in de component Routes

```
<PublicRoute path="/template" render={(routeProps) => {
      return <Template {...routeProps} />
}} />
```

# database

This application gets his resources from the api Mercury. You can find more about this api at https://github.com/RickvanBerlo/Mercury_Api.

To create a new request to the api. you will need to use the custom requestbuilder in the utils folder.

request are bundled in file in the folder databases.

To add a new resource, create a new file in databases and create your new request as a function.

in the actions of redux these functions can be used to make a call to the api.

# warnings

this application is using a Silent check-sso. see more information about this topic on this page: https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc#_modern_browsers

It could be that this feature will be deprecated in the future.

# scrumboard
https://quire.io/w/rickvanberlo?view=stats
