import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../Context/Usercontext";
import { useParams } from "react-router-dom";
import "./CHatspage.css"
export default function Chatspage({ current }) {
  const content = useContext(UserContext);
  const { socket, user, mainUserFollowingInfo, olderChats, chats } = content;
  const [showSendBtn, setShowSendBtn] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null); 

  function handleSentMessage(msg) {
    setMessages((prevMsgs) => [...prevMsgs, msg]);
  }

  let { currentuser } = useParams();

  
  

  const sendMessage = (recieverId) => {
    if (socket) {
      socket.send({
        message: inputMsg,
        senderId: user._id,
        recieverId: recieverId,
      });
    }
    handleSentMessage(inputMsg);
    setInputMsg("");
    SendBtn();
  };


  function SendBtn(value) {
    if (!value || value.trim() === "") {
      setShowSendBtn(false);
    } else {
      setShowSendBtn(true);
    }
  }

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (mainUserFollowingInfo.length > 0) {
      mainUserFollowingInfo.map((followingUsers) => {
        if (followingUsers.user.username === currentuser) {
          olderChats(followingUsers.user._id);
        }
      });
    }
  }, [mainUserFollowingInfo, messages]);

  useEffect(() => {
    scrollToBottom(); 
  }, [chats, messages]);

  return (
    <div
    className="chats-container"
    >
      {mainUserFollowingInfo.length > 0
        ? mainUserFollowingInfo.map((followingUsers) => {
            if (followingUsers.user.username === currentuser) {
              return (
                <>
                  <div className="d-flex align-items-center my-2">
                    <div>
                      <img
                        src={followingUsers.user.profileimageUrl}
                        style={{ borderRadius: "25px" }}
                        className="profile-icon-right mx-3"
                        alt="img"
                      />
                      <b style={{ fontSize: "20px" }}>
                        {followingUsers.user.username}
                      </b>
                    </div>
                  </div>
                  <hr />
                  <div
                    ref={chatBodyRef} 
                    className="chats-body"
                    
                  >
                    {chats !== null ? (
                      chats.msg.length > 0 ? (
                        chats.msg.map((chat) => {
                          if (chat.recieverId === followingUsers.user._id) {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <div
                                  className="mx-3 my-2 chats-msg-contnr"
                                  
                                >
                                  <p
                                  className="actual-msg-in-chats"
                                    
                                  >
                                    {chat.message}
                                  </p>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div style={{display:"flex", justifyContent:"start"}}>
                              <div
                                className="mx-3 my-2 chats-msg-contnr"
                                
                              >
                                <p
                                className="actual-msg-in-chats"
                                >
                                  {chat.message}
                                </p>
                              </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px", fontWeight:"bold"}}>
                          <p>
                            Nothing to show here! Start your conversation by
                            sending a message
                          </p>
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div style={{ padding: "20px" }} className="d-flex">
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        borderRadius: "20px",
                        height: "50px",
                        paddingLeft: "10px",
                      }}
                      value={inputMsg}
                      onKeyDown={(event)=>{
                        if(event.key === "Enter" && inputMsg.trim() !== ""){
                          sendMessage(followingUsers.user._id);
                        }
                      }}
                      placeholder="Message..."
                      onChange={(e) => {
                        SendBtn(e.target.value, followingUsers.user._id);
                        setInputMsg(e.target.value);
                        
                      }}
                      
                    />
                    {showSendBtn && (
                      <i
                        style={{
                          fontSize: "25px",
                          position: "relative",
                          top: "10px",
                          right: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          sendMessage(followingUsers.user._id);
                        }}
                        className="fa-solid fa-paper-plane"
                      ></i>
                    )}
                  </div>
                </>
              );
            }
          })
        : ""}
    </div>
  );
}
