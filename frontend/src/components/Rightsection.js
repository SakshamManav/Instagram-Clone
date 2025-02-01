import React, { useContext,useEffect, useState } from "react";
import "./Rightsection.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext,  } from "../Context/Usercontext";
export default function Rightsection() {
  const context = useContext(UserContext);
  const {user, otherUsers, getUser, getOtherUsers, addFollowingAndFollowers} = context; 
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  function deleteToken() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  async function handleFollowBtn(userId, event){
    await addFollowingAndFollowers(userId);
    getUser();
  }
  
  useEffect(() => {
    if(localStorage.getItem("authToken")){
      getUser();
      getOtherUsers();
    }
  }, []);
  return (
    <>
      <div className="container-right ">
        <div className="d-flex align-items-center">
          <Link  to={`/profile/${user === null ? null : user.username}`}>
          <img
            className="profile-icon-right"
            src={user === null ? " " : user.profileimageUrl}
            style={{ cursor: "pointer", borderRadius:"25px" }}
            alt="img"
          />
          </Link>
          <Link to={`/profile/${user === null ? null : user.username}`} style={{textDecoration:"none",}}  className="right-profile-name">
            <span
              className="user-name mt-1"
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                translate:"8px -12px",
                marginLeft:"5px",
                cursor: "pointer",
                textDecoration:"none",
                color:"black"
              }}
            >
              {user === null ? " " : user.username}
            </span>
            
          </Link>
        </div>
        <div className="m-2">
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => setShowAlert(true)}
          ></i>
          {showAlert && (
        <div className="alert">
          <div>Are you sure you want to logout?</div>
          <div className="d-flex justify-content-between mt-3 mx-3">  <button className="btn btn-danger " onClick={deleteToken}>Yes</button>
          <button className="btn btn-success " onClick={() => setShowAlert(false)}>No</button></div>
        
        </div>
      )}
        </div>

        <b>Suggested for you</b>

        
        {(otherUsers.length > 0  && user === null) ? "loading..." : otherUsers.map((users) => {
  const isFollowing = user.following.includes(users._id);

  return !isFollowing ? (
    <React.Fragment key={users._id}>
      <div className="d-flex align-items-center mt-2" style={{ justifyContent: "space-between" }}>
        <div className="d-flex align-items-center mt-2">
          <Link to={`/profile/${users.username}`}>
          <img
            className="profile-icon-right"
            src={users.profileimageUrl}
            style={{ cursor: "pointer", borderRadius: "25px", border: "2px solid black" }}
            alt="img"
          />
          </Link>
          <div className="right-profile-name">
            <Link  to={`/profile/${users.username}`}
              className="user-name mt-1"
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                translate: "0 -10px ",
                marginLeft: "7px",
                cursor: "pointer",
                textDecoration: "none",
                color:"black",
              }}
            >
              {users.username}
            </Link>
          </div>
        </div>
        <div
          className="follow-btn"
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "blue",
            cursor: "pointer",
            marginRight: "100px",
          }}
          
          onClick={()=>{
            
            handleFollowBtn(users._id)
            // currentuser = users.username
          }}
        >
          Follow
        </div>
      </div>
    </React.Fragment>
  ) : null; 
})}

          
        
      </div>
    </>
  );
}
