import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

var amplifyConfig = require("./config/amplifyConfig.json");
Amplify.configure(amplifyConfig);

export function getSigninComponent() {
  return <AmplifyAuthenticator />;
}

export function getSignoutComponent() {
  return <AmplifySignOut buttonText="Sign Out" />;
}

/**
 * listenForAuthStateChange initializes a listener that will call
 * onSignIn when the user is signed in and onSignOut when a user
 * signs out
 */
export function listenForAuthStateChange(onSignIn, onSignOut) {
  onAuthUIStateChange((nextAuthState, authData) => {
    if (nextAuthState === AuthState.SignedIn) {
      onSignIn(
        authData,
        authData.getSignInUserSession().getIdToken().getJwtToken()
      );
    } else if (nextAuthState === AuthState.SignedOut) {
      onSignOut(authData);
    }
  });
}
