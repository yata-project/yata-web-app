import { useAuth } from "../../hooks/UseAuth";
import { Link } from "react-router-dom";
import * as AuthProvider from "../../AmplifyAuthProvider";

function NavBar() {
  const auth = useAuth();

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item has-text-weight-bold" to="/">
          YATA
        </Link>
      </div>

      {auth.user && (
        <div className="navbar-start">
          <Link to="/lists" className="navbar-item">
            My Lists
          </Link>
        </div>
      )}

      <div className="navbar-end">
        <div className="navbar-item">
          {auth.user && (
            <div className="navbar-item">Welcome, {auth.user.username}</div>
          )}
          {auth.user ? (
            // TODO: stylize this so it is not orange
            AuthProvider.getSignoutComponent()
          ) : (
            <Link to="/login" className="navbar-item">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
