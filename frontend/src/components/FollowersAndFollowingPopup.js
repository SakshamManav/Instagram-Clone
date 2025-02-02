import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";
import "./FollowersAndFollowingPopup.css"


export default function FollowersAndFollowingPopup({ data, modalId }) {
  const modalRef = useRef(null); 
  const closeBtnRef = useRef(null); 
  const context = useContext(UserContext);
  const {
    getContentByName,
    follwingUserInfo,
    followerUserInfo,
    followinginfo,
    deleteFollowingAndFollowers,
  } = context;

  const [loading, setloading] = useState(false);
  
  const { currentuser } = useParams();

 

  useEffect(() => {
    setloading(true)
    getContentByName(currentuser);
    followinginfo();
    setloading(false)
  }, [currentuser]);

  function handlefollowerAndFollowingSectionClick(){
    if (closeBtnRef.current) {
      closeBtnRef.current.click(); 
    }
  }
  

  return (
    <div
      className="modal fade itzContainer"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      data-bs-keyboard="false"
      ref={modalRef}
      data-bs-backdrop="false" // Disable the backdrop here
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          
        >
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeBtnRef} // Assign ref to the close button
            ></button>
          </div>

          {data === "Following"
            ? follwingUserInfo.length > 0
              ? follwingUserInfo.map((usersInfo) => (
                  <div
                    key={usersInfo.user._id}
                    className="d-flex align-items-center mt-1"
                    style={{
                      justifyContent: "space-between",
                      border: "2px solid black",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Link
                        to={`/profile/${usersInfo.user.username}`}
                        onClick={handlefollowerAndFollowingSectionClick}
                      >
                        <img
                          className="profile-icon-right"
                          src={usersInfo.user.profileimageUrl}
                          style={{
                            cursor: "pointer",
                            borderRadius: "25px",
                            border: "2px solid black",
                          }}
                          alt="img"
                        />
                      </Link>
                      <div className="right-profile-name" style={{ translate: "0px 5px" }}>
                        <Link
                          to={`/profile/${usersInfo.user.username}`}
                          onClick={handlefollowerAndFollowingSectionClick}
                          className="user-name mt-1"
                          style={{
                            fontSize: "17px",
                            fontWeight: "bold",
                            translate: "0 -10px ",
                            marginLeft: "7px",
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {usersInfo.user.username}
                        </Link>
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "16px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={async () => {
                        await deleteFollowingAndFollowers(usersInfo.user._id);
                        getContentByName(currentuser);
                        followinginfo();
                      }}
                    >
                      Unfollow
                    </div>
                  </div>
                ))
              : <h2 className="mx-3">User has zero following</h2>
            : followerUserInfo.length > 0
              ? followerUserInfo.map((usersInfo) => (
                  <div key={usersInfo.user._id}
                    style={{
                      border: "2px solid black",
                      padding: "10px",
                      borderRadius: "5px",
                    }} 
                    className="d-flex align-items-center mt-2">
                    <Link
                      to={`/profile/${usersInfo.user.username}`}
                      onClick={handlefollowerAndFollowingSectionClick}
                    >
                      <img
                        className="profile-icon-right"
                        src={usersInfo.user.profileimageUrl}
                        style={{
                          cursor: "pointer",
                          borderRadius: "25px",
                          border: "2px solid black",
                        }}
                        alt="img"
                      />
                    </Link>
                    <div className="right-profile-name">
                      <Link
                        to={`/profile/${usersInfo.user.username}`}
                        onClick={handlefollowerAndFollowingSectionClick}
                        className="user-name mt-1"
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          translate: "0 -10px ",
                          marginLeft: "7px",
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {usersInfo.user.username}
                      </Link>
                    </div>
                  </div>
                ))
              : <h2 className="mx-3">User has zero followers</h2>}
        </div>
      </div>
    </div>
  );
}
