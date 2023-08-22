import React, {useState} from "react";


const Register = () => {
    const [inputs, setInputs] = useState({
        id : "",
        pw : "",
        pwCheck : "",
        email : ""
    });

    const {id, pw, pwCheck, email} = inputs;

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
        <form>
            <lable>ID </lable>
            <input type="text" id="id" value={id} onChange={onChange} />
            <br></br><br></br>

            <lable>PASSWORD </lable>
            <input type="password" id="pw" value={pw} onChange={onChange} />
            <br></br><br></br>

            <lable>PASSWORD CONFIRM </lable>
            <input type="password" id="pwCheck" value={pwCheck} onChange={onChange} />
            <br></br><br></br>

            <lable>EMAIL </lable>
            <input type="email" id="email" value={email} onChange={onChange} />
            <br></br><br></br>

        </form>
        <button type="submit" className="btn-primary"> Register</button>
        </>

    );

}

export default Register;
