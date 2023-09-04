import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
	return (
		<div className="App">
			<div>
				<ul>
					<Link to="/">Home</Link>
				</ul>
			</div>

			<div>
				<ul>
					<li>
						<Link to="/login">Login</Link>{" "}
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
