import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login/Login";
import Registration from "./Registration/Registration";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
        </Routes>
        <Routes>
          <Route path="/registration" element={<Registration/>} />
        </Routes>
      </Router>
    )
  }
}

export default App;