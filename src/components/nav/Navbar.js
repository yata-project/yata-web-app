import {
    Link
} from 'react-router-dom'

function NavBar() {
    return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lists">My Lists</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
        </div>
        );
}

export default NavBar;