import React, {useState} from "react";


const Login = () => {
    const [inputs, setInputs] = useState({
        id : "",
        pw : ""
    });

    const {id, pw} = inputs;

    const onChange =(event) =>{
        const value = event.target.value;
        const id = event.target.id;

        setInputs({
            ...inputs,
            [id] : value
        })
    };

    return (
        <>
        <br></br>
        <div>
            <lable> ID </lable>
            <input type="text" id="id" value={id} onChange={onChange} />
            <br></br>
            <br></br>
        </div>

        <div>
            <lable> PASSWORD </lable>
            <input type="password" id="pw" value={pw} onChange={onChange} />
            <br></br>
            <br></br>
        </div>
        <button type="submit" className="btn-primary"> Login</button>
        </>

    );

}

export default Login;
