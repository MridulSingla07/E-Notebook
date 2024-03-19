import React,{useEffect,useState} from 'react'

export default function User() {

  useEffect(() => {
    if(!sessionStorage.getItem("user")) {
      fetchuser();
    }
    else {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    }

    // eslint-disable-next-line
  }, [])

  const [user, setUser] = useState({name:"", email:""});


  // fetch data of user.
  const fetchuser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "auth-token" : sessionStorage.getItem("token")
      },
    });
    const json = await response.json();
    sessionStorage.setItem("user", JSON.stringify(json));// store data in local storage
    setUser(json);

  }
  

  return (
    <div className="container my-5">
      <div className="card" style={{height:"30rem"}}>
      <svg xmlns="http://www.w3.org/2000/svg" className= "rounded-circle" height="10em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          <div className="card-body">
            <h5 className="card-title"><strong>Name:</strong> {user.name}</h5>
            <h5 className="card-text"><strong>Email:</strong> {user.email}</h5>
          </div>
      </div>
    </div>
  )
}
