## dependencies
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

## Creating pages
For creating a page you will need to execute the following intructions.

1. Create .js file
2. add route
    * edit config/pages.js //public
    * edit routes/routes.js //private

### `Template.js File`
Down below you can see a template for creating a page. Copy and past this template in you new .js file and change the names "template" to your custom name.

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


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

--------------------------------------------------------------------------------------------------------------------------
Default scrumboard:
https://quire.io/w/rickvanberlo?view=stats
