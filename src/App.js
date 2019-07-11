import React from "react";
import "./App.css";
import List from "./components/List";
import dataService from "./services/dataService";

class App extends React.Component {
  state = {
    rooms: [],
    speakers: [],
    events: []
  };

  componentDidMount() {
    dataService.getRooms().on("value", snapshot => {
      const db = snapshot.val();
      this.setState({
        rooms: db.rooms,
        speakers: db.speakers,
        events: db.events
      });
    });
  }
  render() {
    var speakers = this.state.speakers.map(s => (
      <p>{s.person_display_last_name}</p>
    ));

    return (
      <div className="App">
        <List rooms={this.state.rooms} />
        <div>{speakers}</div>
      </div>
    );
  }
}

export default App;
