import './App.css';
import React from "react";
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";

function App() {
  return (
    <div>
      <Navbar title='Github Finder' icon='fab fa-github'/>
      <div className='container'>
        <Users/>
      </div>
    </div>
  );
}

export default App;
