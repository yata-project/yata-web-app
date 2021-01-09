import "./App.css";
import AllListsView from "./components/AllListsView";
import ListDetailsView from "./components/ListDetailsView";
import LoginView from "./components/LoginView";
import NavBar from "./components/nav/Navbar";
import { ProvideAuth, useAuth } from "./hooks/UseAuth";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute path="/list/:id" children={<ListDetailsView />} />
          <PrivateRoute path="/lists">
            <AllListsView />
          </PrivateRoute>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

function Home() {
  return <h2>This will be the home page</h2>;
}

/**
 * PrivateRoute is a wrapper around Route that will redirect the user to
 * authenticate if they are not authenticated yet.
 * This implementation is taken from the react-router sample:
 * https://reactrouter.com/web/example/auth-workflow
 */
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
