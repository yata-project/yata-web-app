import './App.css';
import AllListsView from './components/AllListsView'
import ListDetailsView from './components/ListDetailsView'
import NavBar from './components/nav/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <NavBar />

      <section class="section">
        <div class="container">
          <Switch>
            <Route path="/list/:id" children={<ListDetailsView />} />
            <Route path="/lists">
              <AllListsView />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </section>
    </Router>
  );
}

function Home() {
  return <h2>This will be the home page</h2>;
}

export default App;
