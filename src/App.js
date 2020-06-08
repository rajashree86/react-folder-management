import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import FileManager from './components/FileManager';
import SubFolder from './components/SubFolder';

function App() {
  return (
    
    <BrowserRouter>
      <div className="App" >
        <Route exact path="/" component={FileManager} />
        <Route path="/subfolder" component={SubFolder} />
      </div>
    </BrowserRouter>
   
  );
}

export default App;
