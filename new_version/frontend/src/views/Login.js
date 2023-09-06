import React, { useState } from "react";

const Login = () => {
	const [inputs, setInputs] = useState({
		name: "",
		password: "",
	});

	const { name, password } = inputs;

	const onChange = (event) => {
		const value = event.target.value;
		const id = event.target.id;

		setInputs({
			...inputs,
			[id]: value,
		});
	};

	return (
		<>
			<section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
				<div className="p-6 bg-white rounded-md shadow-md">
					<div>
						<h1 className="mt-4 text-3xl font-semibold text-center"> Login </h1>
					</div>
					<div className="flex content-center justify-center">
						<form className="mt-10">
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
									className="w-80 px-4 py-2 mt-2 bg-white border rounded-md"
									value={name}
									onChange={onChange}
								/>
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
									value={password}
									onChange={onChange}
								/>
							</div>
						</form>
					</div>
					<div className="mt-6 flex content-center justify-center">
						<button className="border bg-blue-100 rounded-md px-4 py-2">
							{" "}
							Login
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
