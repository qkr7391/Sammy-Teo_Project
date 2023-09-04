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
            <br></br>
            <form onSubmit={fetchData}>
                <label>ID </label>
                <input type="text" id="id" value={id} onChange={onChange} />
                <br></br>
                <br></br>

                <label>PASSWORD </label>
                <input type="password" id="pw" value={pw} onChange={onChange} />
                <br></br>
                <br></br>

                <label>PASSWORD CONFIRM </label>
                <input type="password" id="pwCheck" value={pwCheck} onChange={onChange} />
                <br></br>
                <br></br>

                <label>EMAIL </label>
                <input type="email" id="email" value={email} onChange={onChange} />
                <br></br>
                <br></br>
            </form>
            <button className="btn-primary" onClick={fetchData}>
                {" "}
                Register
            </button>
        </>
    );
};

export default Register;
