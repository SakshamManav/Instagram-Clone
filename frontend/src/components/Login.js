import React,{useState , useContext} from "react";
import "./Login.css"; // Custom CSS for additional styling if needed
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";
import Alert from "./Alert";
const Login = () => {
  const context = useContext(UserContext);
  const { setAlertMsg,showAlertElement,setShowAlert} = context;
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email:"",
    password:"",
  });
  const url = "https://instagram-clone-8uu2.vercel.app/insta/user/login";
  function handleOnChange(e){
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }
  
  async function LoginUser() {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // specifying the request body type
      },
      body: JSON.stringify({
        email:user.email,
        password:user.password,
      }),
    });
   
    let result = await response.json();
    
    
    setAlertMsg({msg:result.msg, type:"danger"});
    if(response.ok){
      localStorage.setItem("authToken", result.authToken);
      await navigate("/");
    }
    else{
      
      setShowAlert(true);
      showAlertElement();
    }
  }
  function onsubmit(e){
    e.preventDefault();
    LoginUser();
    
  }
  
  return (
    <>
   <div style={{width:"100%", margin:"12px"}}>
   <Alert />
   <div className="login-container d-flex justify-content-center align-items-center" >
    
    <div className="login-card">
      <div className="card text-center p-4">
        <div className="insta-logo-container1 w-400 d-flex justify-content-center" >
        <img
          src="images/instagram-logo-illustration-removebg-preview.png"
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
          <button className="btn btn-primary w-100 mb-2">Log In</button>
          
        </form>
      </div>
      <div className="card text-center mt-3 p-3">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      
    </div>
  </div>
   </div>
    
    </>
  );
};

export default Login;
