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

Create the json file in `src/config/amplifyConfig.json`. The values used for the
config will be taken from the user pool we want to use for authentication.

TODO: we should be able to specify this file as an input running `npm start`.

## Running the web app

To start the web app, in directory of this respository, you can run `npm start`
which will build and run the app in development mode. Navigate to
[http://localhost:3000](http://localhost:3000) to view it in the browser.
