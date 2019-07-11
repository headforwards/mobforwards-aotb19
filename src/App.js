import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import List from "./components/List";
import dataService from "./services/dataService";
import Room from "./components/Room";

class App extends React.Component {
  state = {
    rooms: [],
    speakers: [],
    events: []
  };

  async componentDidMount() {
    var db = await dataService.getData();

    this.setState({
      rooms: db.rooms,
      speakers: db.speakers,
      events: db.events
    });
  }
  render() {
    // var speakers = this.state.speakers.map(s => (
    //   <p>{s.person_display_last_name}</p>
    // ));

    return (
      <div className="App">
        <Router>
          <Route path="/rooms/:name" component={Room} />
        </Router>
        <List rooms={this.state.rooms} />
        {/* <div>{speakers}</div> */}
      </div>
    );
  }
}

export default App;
