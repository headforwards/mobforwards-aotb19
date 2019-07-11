import React from "react";
import "./App.css";
import List from "./components/List";
import dataService from "./services/dataService";

class App extends React.Component {
  state = {
    rooms: []
  };
  componentDidMount() {
    dataService.getRooms().on("value", snapshot => {
      const roomstuff = snapshot.val().rooms;
      this.setState({ rooms: roomstuff });
    });
  }
  render() {
    return (
      <div className="App">
        <List rooms={this.state.rooms} />
      </div>
    );
  }
}

export default App;
