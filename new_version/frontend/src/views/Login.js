import React, { useState } from "react";

const Login = () => {
	const [inputs, setInputs] = useState({
		id: "",
		pw: "",
	});

	const { id, pw } = inputs;

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
			<section>
				<div>
					<h1 className="text-3xl font-semibold text-center"> Login </h1>
				</div>

				<form className="mt-6">
					<div className="relative mb-2">
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
							className="w-6/12 px-4 py-2 mt-2 bg-white border rounded-md"
							value={id}
							onChange={onChange}
						/>
					</div>

					<div className="relative mb-2">
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
							className="w-6/12 px-4 py-2 mt-2 bg-white border rounded-md"
							value={pw}
							onChange={onChange}
						/>
					</div>
				</form>
				<div className="mt-6">
					<button className="border bg-blue-100 rounded-md px-4 py-2">
						{" "}
						Login
					</button>
				</div>
			</section>
		</>
	);
};

export default Login;
