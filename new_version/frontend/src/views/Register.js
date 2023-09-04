import React, { useState } from "react";
import axios from "axios";
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
        event.prevenetDefault();

        // await axios.get('url').then((response) => setInputs(response.data));

        try {
            const response = await axiosInstance.post("YOUR_API_ENDPOINT/register", inputs);
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
                <lable>ID </lable>
                <input type="text" id="id" value={id} onChange={onChange} />
                <br></br>
                <br></br>

                <lable>PASSWORD </lable>
                <input type="password" id="pw" value={pw} onChange={onChange} />
                <br></br>
                <br></br>

                <lable>PASSWORD CONFIRM </lable>
                <input type="password" id="pwCheck" value={pwCheck} onChange={onChange} />
                <br></br>
                <br></br>

                <lable>EMAIL </lable>
                <input type="email" id="email" value={email} onChange={onChange} />
                <br></br>
                <br></br>
            </form>
            <button type="submit" className="btn-primary">
                {" "}
                Register
            </button>
        </>
    );
};

export default Register;
