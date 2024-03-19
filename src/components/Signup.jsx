import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

    const [newUser, setNewUser] = useState({ name:"",email: "", password: "" });
    let navigate = useNavigate();

    // change func 
    const onChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    // Submit func
    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newUser.name,email: newUser.email, password: newUser.password }),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            sessionStorage.setItem("token", json.authToken);
            props.showAlert("Created Account Successfully", "success");
            navigate("/");
        }
        else {
            props.showAlert("Enter valid data", "danger");
        }
    }
    return (
        <div className="container my-5"> 
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cPassword" onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
