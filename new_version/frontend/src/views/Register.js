import React, { useState } from "react";
import axiosInstance from "../utils/axios";

const Register = () => {
	const [inputs, setInputs] = useState({
		id: "",
		pw: "",
		pwCheck: "",
		email: "",
	});

	const { id, pw, pwCheck, email } = inputs;

	const onChange = (event) => {
		const value = event.target.value;
		const id = event.target.id;
		setInputs({
			...inputs,
			[id]: value,
		});
	};

	const checkPW = (pw, pwCheck) => {
		if (pw === pwCheck) {
			return true;
		}
		return false;
	};

	const fetchData = async (event) => {
		// await axios.get('url').then((response) => setInputs(response.data));

		try {
			const response = await axiosInstance.post("/users/register", inputs);
			console.log("Registration successful!", response.data);
			// Handle success, redirect, or show a success message to the user
		} catch (error) {
			console.error("Registration failed:", error);
			// Handle error, display error message, etc.
		}
	};

	return (
		<>
			<section>
				<div>
					<h1 className="text-3xl font-semibold text-center"> Register </h1>
				</div>

				<form className="mt-6">
					<div className="mb-2">
						<label htmlFor="id" className="text-sm font-semibold text-grey-800">
							{" "}
							ID{" "}
						</label>
						<input
							type="text"
							id="id"
							className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
							value={id}
							onChange={onChange}
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="pw" className="text-sm font-semibold text-grey-800">
							{" "}
							PassWord{" "}
						</label>
						<input
							type="password"
							id="pw"
							className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
							value={pw}
							onChange={onChange}
						/>
					</div>

					<div className="mb-2">
						<label
							htmlFor="pwCheck"
							className="text-sm font-semibold text-grey-800"
						>
							{" "}
							PassWord Confirm
						</label>
						<input
							type="password"
							id="pwCheck"
							className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
							value={pwCheck}
							onChange={onChange}
						/>
					</div>

					<div className="mb-2">
						<label
							htmlFor="email"
							className="text-sm font-semibold text-grey-800"
						>
							Email{" "}
						</label>
						<input
							type="email"
							id="email"
							className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
							value={email}
							onChange={onChange}
						/>
					</div>
				</form>
				<div className="mt-6">
					<button className="btn-primary" onClick={fetchData}>
						Register
					</button>
				</div>
			</section>
		</>
	);
};

export default Register;
