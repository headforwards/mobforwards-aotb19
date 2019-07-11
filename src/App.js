import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import dataService from './services/dataService';

function App() {
  const rooms = dataService.rooms();
  return (
    <div className="App">
      <List rooms={rooms}/>
    </div>
  );
}

export default App;
