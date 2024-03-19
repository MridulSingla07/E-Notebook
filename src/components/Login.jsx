import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [credentials, setCredentials] = useState({email: "",password:""});
    let navigate = useNavigate();


    // saving entered data 
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value});
      }


      // login funtion processing after submit
    const submit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password}),
          });
          const json = await response.json();
          console.log(json);

          if(json.success) {
            sessionStorage.setItem("token",json.authToken);
            props.showAlert("Logged in Successfully", "success");
            navigate("/");
          }
          else{
            props.showAlert("Enter valid Credentials", "danger");
          }
    }

    return (
        <div className="container my-5">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
