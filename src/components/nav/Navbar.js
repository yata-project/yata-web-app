import {
  useAuth
} from "../../hooks/UseAuth"

import {
    Link
} from 'react-router-dom'

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
                auth.user && <div class="navbar-item">Welcome, {auth.user.name}</div>
              }
              {
                auth.user ? (
                  <button onClick={() => auth.signout()} class="navbar-item">Log Out</button>
                ) : (
                  <button onClick={() => auth.signin()} class="navbar-item">Log In</button>
                )
              }
            </div>
          </div>
        </nav>
        );
}

export default NavBar;
