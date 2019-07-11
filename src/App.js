import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import DataService from './services/dataService';
import firebaseConfig from "./firebaseconfig" 
import Firebase from "firebase"

function App() {
  Firebase.initializeApp(firebaseConfig);
  let dataService = new DataService();
  const rooms = dataService.getRooms();
  const speakers = dataService.getSpeakers();
  return (
    <div className="App">
      <List rooms={rooms}/>
    </div>
  );
}

export default App;
