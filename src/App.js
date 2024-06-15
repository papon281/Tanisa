import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
        </Routes>
      </Router>
    )
  }
}

export default App;