# Getting started with this project

## Configuration

### Amplify Configuration

We need to provide the amplify configuration in order to integrate the
authentication piece. In order to do so, create a JSON file with the following
fields:

```
{
    "Auth": {
        "region": "AWS_REGION",
        "userPoolId": "COGNITO_USER_POOL_ID",
        "userPoolWebClientId": "COGNITO_APP_CLIENT_ID"
    }
}
```

Update the json file in `src/config/amplifyConfig.json`. The values used for the
config will be taken from the user pool we want to use for authentication.

TODO: we should be able to specify this file as an input running `npm start`.

## Running the web app

To start the web app, in directory of this respository, you can run `npm start`
which will build and run the app in development mode. Navigate to
[http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development

In the project directory, you can run:

### `npm run format`

Formats the project with `prettier`.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.
