import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Redirect } from "react-router-dom";

import axiosInstance from "../utils/axios";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: "onChange" });

	const [inputs, setInputs] = useState({
		name: "",
		password: "",
		pwCheck: "",
		email: "",
	});

	const { name, password, pwCheck, email } = inputs;

	const onChange = (event) => {
		const value = event.target.value;
		const id = event.target.id;
		setInputs({
			...inputs,
			[id]: value,
		});
	};

	const checkPW = (password, pwCheck) => {
		if (password === pwCheck) {
			return true;
		}
		return false;
	};

	const onSubmit = ({ name, password, pwCheck, email }) => {
		reset();
	};

	//required name
	const userName = {
		required: "Required field",
	};

	//required email
	const userEmail = {
		required: "Required field",
	};

	//required password
	const userPassword = {
		required: "Required field",
	};

	// await axios.get('url').then((response) => setInputs(response.data));
	const fetchData = async (event) => {
		//new object for sending data except passwordCheck
		const data = { name, password, email };

		//Distinguish that password and passwordcheck is same or not
		if (!checkPW(password, pwCheck)) {
			alert("Password do not match");
			console.log("Registration failed: check Password and Password Confirm");
		} else {
			try {
				// Handle success, redirect, or show a success message to the user
				const response = await axiosInstance.post("/users/register", data);
				console.log("Registration successful!", response.data);
				// Success register, redirect to home
				// <Redirect to="/" />;
			} catch (error) {
				// Handle error, display error message, etc.
				console.error("Registration failed:", error);
			}
		}
	};

	return (
		<>
			<section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
				<div className="p-6 bg-white rounded-md shadow-md">
					<div>
						<h1 className="mt-4 text-3xl font-semibold text-center">
							Register
						</h1>
					</div>
					<div className="flex justify-center">
						<form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
							{/* <form className="mt-10"> */}
							<div className="relative mb-4">
								<label
									htmlFor="name"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									{" "}
									Name{" "}
								</label>
								<input
									type="text"
									id="name"
									className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
									{...register("name", userName)}
									value={name}
									onChange={onChange}
								/>
								{errors?.name && (
									<div>
										<span className="text-red-500">{errors.name.message}</span>
									</div>
								)}
							</div>

							<div className="relative mb-4">
								<label
									htmlFor="password"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									{" "}
									PassWord{" "}
								</label>
								<input
									type="password"
									id="password"
									className="w-80 px-4 py-2 mt-2 bg-white border rounded-md"
									{...register("password", userPassword)}
									value={password}
									onChange={onChange}
								/>
								{errors?.password && (
									<div>
										<span className="text-red-500">
											{errors.password.message}
										</span>
									</div>
								)}
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
									{...register("pwCheck", userPassword)}
									value={pwCheck}
									onChange={onChange}
								/>
								{errors?.pwCheck && (
									<div>
										<span className="text-red-500">
											{errors.pwCheck.message}
										</span>
									</div>
								)}
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
									{...register("email", userEmail)}
									value={email}
									onChange={onChange}
								/>
								{errors?.email && (
									<div>
										<span className="text-red-500">{errors.email.message}</span>
									</div>
								)}
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
				</div>
			</section>
		</>
	);
};

export default Register;
