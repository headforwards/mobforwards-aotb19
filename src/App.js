import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import List from "./components/List";
import Room from "./components/Room";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={List} />
          <Route path="/rooms/:name" component={Room} />
        </Router>
      </div>
    );
  }
}

export default App;
