import './App.css';
import Map from './components/Map'
import Header from './components/Header'
import Home from './components/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
