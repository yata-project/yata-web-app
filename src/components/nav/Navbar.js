import {
    Link
} from 'react-router-dom'

function NavBar() {
    return (
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <Link class="navbar-item has-text-weight-bold" to="/">YATA</Link>
          </div>

          <div class="navbar-start">
            <Link to="/lists" class="navbar-item">My Lists</Link>
          </div>

          <div class="navbar-end">
            <Link to="/login" class="navbar-item">Log In</Link>
          </div>
        </nav>
        );
}

export default NavBar;
