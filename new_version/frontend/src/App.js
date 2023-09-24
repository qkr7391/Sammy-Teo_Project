import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Footer from "./views/Footer";

function App() {
	return (
		<div className="App">
			<div>
				<ul className="ml-4 mt-4 mb-4">
					<Link to="/">Home</Link>
				</ul>
			</div>

			<div className="absolute top-0 right-0">
				<ul className="flex content-right">
					<li className="mr-4 mt-4 mb-4">
						<Link to="/login"> Login </Link>
					</li>
					<li className="mr-4 mt-4 mb-4">
						<Link to="/register"> Register </Link>
					</li>
				</ul>
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/footer" element={<Footer />} />
			</Routes>
		</div>
	);
}

export default App;
