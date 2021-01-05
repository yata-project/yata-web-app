import { useAuth } from "../../hooks/UseAuth"
import { Link } from 'react-router-dom'
import * as AuthProvider from '../../AmplifyAuthProvider'

function NavBar() {
    const auth = useAuth();

    return (
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">          
          <div class="navbar-brand">
            <Link class="navbar-item has-text-weight-bold" to="/">YATA</Link>
          </div>

          { auth.user &&
            <div class="navbar-start">
              <Link to="/lists" class="navbar-item">My Lists</Link>
            </div>
          }

          <div class="navbar-end">
            <div class="navbar-item">
              {
                auth.user && <div class="navbar-item">Welcome, {auth.user.username}</div>
              }
              {
                auth.user ? (
                  // TODO: stylize this so it is not orange
                  AuthProvider.getSignoutComponent()
                ) : (
                  <Link to="/login" class="navbar-item">Log In</Link>
                )
              }
            </div>
          </div>
        </nav>
        );
}

export default NavBar;
