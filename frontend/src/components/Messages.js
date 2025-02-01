import React, { useContext, useState } from "react";
import { UserContext } from "../Context/Usercontext";
import { Link } from "react-router-dom";
import "./Messages.css";
import Chatspage from "./Chatspage";
export default function Messages() {
  const context = useContext(UserContext);
  const { user, mainUserFollowingInfo, olderChats } = context;

  const [currentChat, setCurrentChat] = useState({
    profileimageUrl: "",
    username: "",
    userId: "",
  });

  function handleAccoutnClick(profileimageUrl, username, userId) {
    setCurrentChat({
      ...currentChat,
      profileimageUrl: profileimageUrl,
      username: username,
      userId: userId,
    });
    // console.log(currentChat);
  }
  return (
    <>
      <div className="container-msgs" style={{backgroundColor:"pink"}} >
        <div className=" my-5 ">
          <h4>{user?.username}</h4>
        </div>
        <div style={{ fontSize: "18px", margin: "0px 0 20px 5px" }}>
          <b>Messages</b>
        </div>
        <div
        className="main-body-messages"
        >
          {mainUserFollowingInfo.length > 0
            ? mainUserFollowingInfo.map((followingusers) => {
                return (
                  <Link
                    className="message-user"
                    
                    to={`/messages/${followingusers.user.username}`}
                    onClick={() => {
                      olderChats(followingusers.user._id);
                    }}
                  >
                    <div className="name-icon-container d-flex ">
                      <div>
                        <img
                          className="profile-icon-rightMsg"
                          src={followingusers.user.profileimageUrl}
                          style={{
                            cursor: "pointer",
                            borderRadius: "25px",
                            border: "2px solid black",
                          }}
                          alt="img"
                        />
                      </div>
                      <div className="right-profile-name">
                        <div
                          className="user-name mt-1"
                          style={{
                            fontSize: "17px",
                            fontWeight: "bold",
                            translate: "0 -10px ",
                            marginLeft: "7px",
                            cursor: "pointer",
                            color: "black",
                            textDecoration: "none",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {followingusers.user.username}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            : <h2 className="mt-2">Follow someone to start your chat</h2>}
        </div>
      </div>
      <div className="vertical-line"></div>
    </>
  );
}
