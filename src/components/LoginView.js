import React from "react";
import { useAuth } from "../hooks/UseAuth";
import * as AuthProvider from "../AmplifyAuthProvider";

function LoginView() {
  const auth = useAuth();

  React.useEffect(() => {
    AuthProvider.listenForAuthStateChange(auth.signin, auth.signout);
  }, [auth]);

  return <div className="container">{AuthProvider.getSigninComponent()}</div>;
}

export default LoginView;
