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
				<div className="flex justify-center">
					<form className="mt-10">
						<div className="relative mb-4">
							<label
								htmlFor="id"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
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

						<div className="relative mb-4">
							<label
								htmlFor="pw"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								{" "}
								PassWord{" "}
							</label>
							<input
								type="password"
								id="pw"
								className="w-80 px-4 py-2 mt-2 bg-white border rounded-md"
								value={pw}
								onChange={onChange}
							/>
						</div>

						<div className="relative mb-4">
							<label
								htmlFor="pwCheck"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								{" "}
								PassWord Confirm
							</label>
							<input
								type="password"
								id="pwCheck"
								className="w-80 px-4 py-2 mt-2 bg-white border rounded-md"
								value={pwCheck}
								onChange={onChange}
							/>
						</div>

						<div className="relative mb-4">
							<label
								htmlFor="email"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								Email{" "}
							</label>
							<input
								type="email"
								id="email"
								className="w-80 px-4 py-2 mt-2 bg-white border rounded-md"
								value={email}
								onChange={onChange}
							/>
						</div>
					</form>
				</div>
				<div className="mt-6 flex content-center justify-center">
					<button
						className="border bg-blue-100 rounded-md px-4 py-2"
						onClick={fetchData}
					>
						{" "}
						Register
					</button>
				</div>
			</section>
		</>
	);
};

export default Register;
