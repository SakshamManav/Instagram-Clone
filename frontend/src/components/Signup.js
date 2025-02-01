import React, {useState,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { UserContext } from "../Context/Usercontext";
import Alert from "./Alert";
export default function Signup() {
  const context = useContext(UserContext);
  const { setAlertMsg,showAlertElement,setShowAlert} = context;
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username:"",
    email:"",
    password:"",
  });

  // Handle space in username input
  const handleKeyPress = (event) => {
    if (event.key === ' ') {
        event.preventDefault(); // Prevent space key from being entered
    }
};

  const url = "http://192.168.29.16:3001/insta/user/signup";
  function handleOnChange(e){
    const {name, value} = e.target;
    setUser({...user, [name]: value})
    // console.log(e.target.value)
    
  }
  
  async function signupUser() {
    // console.log(user);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        username:user.username.toLowerCase(),
        email:user.email,
        password:user.password,
      }),
    });
   
    let result = await response.json();
    // console.log(result);
    if(response.ok){
      localStorage.setItem("authToken", result.authToken);
      await navigate("/");
    }
    else{
     
        setAlertMsg({msg:result.msg[0].msg, type:"danger"});
          setShowAlert(true);
      showAlertElement();
    }
  }
  function onsubmit(e){
    e.preventDefault();
    signupUser();
    
  }
  

  return (
    <div style={{width:"100%", margin:"12px"}}>
    <Alert/>
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card">
        <div className="card text-center p-4">
          <div className="insta-logo-container1 w-400 d-flex justify-content-center">
            <img
              src="/images/instagram-logo-illustration-removebg-preview.png"
              alt="Instagram logo"
              className="instagram-logo"
            />
          </div>
          <form onSubmit={onsubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                id="username"
                className="form-control"
                name="username"
                placeholder="Username"
                onChange={handleOnChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                id="email"
                className="form-control"
                name="email"
                placeholder="email"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleOnChange}
              />
            </div>
            <button className="btn btn-primary w-100 mb-2">Sign up</button>
          </form>
        </div>
        <div className="card text-center mt-3 p-3">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
