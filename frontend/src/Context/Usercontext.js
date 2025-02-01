import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [posts, setPost] = useState([]);
  const [showspinner, setShowSpinner] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    msg: "",
    type: "",
  });
  const [uploaded, setUploaded] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [otherUsers, setOtherUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [followingPeople, setFollowingPeople] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [follwingUserInfo, setFollowingUserInfo] = useState([]);
  const [followerUserInfo, setFollowerUserInfo] = useState([]);
  const hasFetched = useRef({ following: false, followers: false });
  const [showModal, setShowModal] = useState(false);
  const [followingCheck, setFollowingCheck] = useState(false);
  const [mainUserFollowingInfo, setMainUserFollowingInfo] = useState([]);
  const [urlUser, setUrlUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState(null);
  const [currentMsg, setCurrentMsg] = useState(null);

  // TO get the user info

  async function getUser() {
    const userUrl = "https://instagram-clone-a458.onrender.com/insta/user/userinfo";
    let response = await fetch(userUrl, {
      method: "GET",
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    });
    let userinfo = await response.json();
    await setUser(userinfo.User);
    await setFollowingPeople(userinfo.User.following);
  }

  // Update profile photo
  async function updateProfilePhoto(files) {
    let formData = new FormData();
    formData.append("image", files); // Append the content type

    const url = "https://instagram-clone-a458.onrender.com/insta/user/updateuserimg";
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
      body: formData,
    });
    let result = await response.json();
    let url1 = result.url;
    console.log(result);
    setUser({ ...user.profileimageUrl, url1 });
    console.log("it is happening")
    getUser();
  }

  // To get Other users

  async function getOtherUsers() {
    const userUrl = "https://instagram-clone-a458.onrender.com/insta/user/searchusers";
    let response = await fetch(userUrl, {
      method: "GET",
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    });
    let result = await response.json();
    setOtherUsers(result);
  }

  // To get the user by its id ( to get info of followers and following)

  async function getUserById(userid) {
    const response = await fetch(
      `https://instagram-clone-a458.onrender.com/insta/user/searchuserbyid/${userid}`,
      {
        method: "GET",
      }
    );
    let result = await response.json();

    return result;
  }

  // CONTENT APIS

  // To upload content

  async function uploadContent(contenttype, file) {
    let formData = new FormData();
    formData.append("contentType", contenttype); // Append the content type
    formData.append("image", file);

    const url = "https://instagram-clone-a458.onrender.com/insta/content/uploadcontent";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        authToken: localStorage.getItem("authToken"),
      },
      body: formData,
    });
    let result = await response.json();
    setAlertMsg({
      msg: result.msg,
      type: "primary",
    });

    if (response.ok) {
      setShowSpinner(false);
      setUploaded(true);
    }
    getContent();
  }

  // To get content (posts)

  async function getContent() {
    const url = "https://instagram-clone-a458.onrender.com/insta/content/getcontent";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    });
    let result = await response.json();
    setPost(result.images);
    setPostCount(result.postcount);
    getContentByName(urlUser);
  }

  // To get content of user by his/her name
  async function getContentByName(usersname) {
    let response = await fetch(
      `https://instagram-clone-a458.onrender.com/insta/content/getcontent/${usersname}`,
      {
        method: "GET",
      }
    );
    let result = await response.json();
    await setUserProfileData(result);
    followinginfo();
  }

  // Followers and following

  // To update following
  async function addFollowingAndFollowers(followingId) {
    const response = await fetch(
      "https://instagram-clone-a458.onrender.com/insta/user/follow",
      {
        method: "PUT",
        headers: {
          authToken: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followingId: followingId,
        }),
      }
    );
    const result = await response.json();

    await getUser();
    await UserfollowingInfo();
  }

  // To unfollow
  async function deleteFollowingAndFollowers(followingId) {
    const response = await fetch(
      "https://instagram-clone-a458.onrender.com/insta/user/unfollow",
      {
        method: "PUT",
        headers: {
          authToken: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followingId: followingId,
        }),
      }
    );
    const result = await response.json();

    getUser();
  }

  // To get the older messages from database

  async function olderChats(recieverId) {
    const response = await fetch(
      `https://instagram-clone-a458.onrender.com/insta/user/userschats/${recieverId}`,
      {
        method: "GET",
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      }
    );
    const result = await response.json();
    setChats(result);
    console.log(result);
  }

  // To like videos or images(Content)

  async function likeContent(contentId) {
    const response = await fetch(
      "https://instagram-clone-a458.onrender.com/insta/content/likeContent",
      {
        method: "PUT",
        headers: {
          authToken: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: contentId,
        }),
      }
    );

    const result = await response.json();
    console.log(result);
    followinginfo();
  }

  // To Unlike videos or images(Content)

  async function UnlikeContent(contentId) {
    const response = await fetch(
      "https://instagram-clone-a458.onrender.com/insta/content/unlikeContent",
      {
        method: "PUT",
        headers: {
          authToken: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: contentId,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    followinginfo();
  }

  // --------  External Functions ----------------

  // Function to showAlert for some time
  function showAlertElement() {
    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
  }

  async function followinginfo() {
    if (!userProfileData) return;

    // Fetch following data
    const followingDataPromises =
      userProfileData.User.following.map(getUserById);
    const followingData = await Promise.all(followingDataPromises);
    setFollowingUserInfo(followingData); 


    // Fetch follower data
    const followersDataPromises =
      userProfileData.User.followers.map(getUserById);
    const followersData = await Promise.all(followersDataPromises);
    setFollowerUserInfo(followersData); 
  }

  async function UserfollowingInfo() {
    if (!user) return;
    const followingDataPromises = user.following.map(getUserById);
    const followingData = await Promise.all(followingDataPromises);
    setMainUserFollowingInfo(followingData);
  }

  useEffect(() => {
    followinginfo();
    UserfollowingInfo();
    console.log(user);
    console.log(mainUserFollowingInfo);
    console.log(follwingUserInfo);
    console.log(otherUsers);
    console.log(localStorage.getItem("authToken"));
    console.log(user);
    
  }, [userProfileData, user, followingPeople]);

  useEffect(() => {
    console.log(chats);
    
  }, [chats]);

  useEffect(() => {
    const socketInstance = io("https://instagram-clone-a458.onrender.com", {
      auth: {
        token: localStorage.getItem("authToken"),
      },
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });
    socketInstance.on("message-sent", (data) => {
      console.log(data);
      if (chats) {
        setChats((prevChats) => {
          console.log(prevChats);
          if (
            (data.recieverId === prevChats.msg[0]?.recieverId &&
              data.senderId === prevChats.msg[0]?.senderId) ||
            (data.recieverId === prevChats.msg[0]?.senderId &&
              data.senderId === prevChats.msg[0]?.recieverId)
          ) {
            return {
              ...prevChats,
              msg: [...prevChats.msg, data],
            };
          }
          return prevChats;
        });
      }
      console.log(chats);
    });
    socketInstance.on("receiveMessage", (data) => {
      console.log("Message received:", data);

      if (chats) {
        setChats((prevChats) => {
          console.log(prevChats);

          if (
            (data.recieverId === prevChats.msg[0]?.recieverId &&
              data.senderId === prevChats.msg[0]?.senderId) ||
            (data.recieverId === prevChats.msg[0]?.senderId &&
              data.senderId === prevChats.msg[0]?.recieverId)
          ) {
            return {
              ...prevChats,
              msg: [...prevChats.msg, data],
            };
          }
          return prevChats;
        });
      }
      console.log(chats);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      console.log("Socket disconnected");
    };
  }, [chats]);

  return (
    <UserContext.Provider
      value={{
        getUser,
        user,
        uploadContent,
        getContent,
        posts,
        alertMsg,
        setAlertMsg,
        showspinner,
        setShowSpinner,
        uploaded,
        setUploaded,
        postCount,
        updateProfilePhoto,
        otherUsers,
        getOtherUsers,
        showAlert,
        setShowAlert,
        showAlertElement,
        followingPeople,
        addFollowingAndFollowers,
        deleteFollowingAndFollowers,
        userProfileData,
        getContentByName,
        getUserById,
        follwingUserInfo,
        setFollowingUserInfo,
        followinginfo,
        followerUserInfo,
        hasFetched,
        showModal,
        setShowModal,
        followingCheck,
        setFollowingCheck,
        mainUserFollowingInfo,
        UserfollowingInfo,
        setUrlUser,
        setUserProfileData,
        likeContent,
        UnlikeContent,
        socket,
        setSocket,
        olderChats,
        chats,
        setChats,
        currentMsg,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
