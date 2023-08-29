import React from "react";
import {Routes, Route, Link} from "react-router-dom"



import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";


function App() {
  return (

      <div className="App">
        <nav className="header_nav_left">
          <ul className="header_menu_left">
            <li><Link to="/" className="header_menu_item">Home</Link></li>
          </ul>
        </nav>

        <nav className="header_nav_right">
          <ul>
            <li><Link to="/login" className="header_menu_item">Login</Link> </li>
            <li><Link to="/register" className="header_menu_item">Register</Link></li>
          </ul>
        </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
      </div>

  );
}

export default App;
