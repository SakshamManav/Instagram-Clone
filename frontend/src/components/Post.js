import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/Usercontext";
import { useParams } from "react-router-dom";

export default function Post() {
  const content = useContext(UserContext);
  const { getContent, posts, userProfileData, getContentByName, user } = content;
  let { currentuser } = useParams();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getContent();
      getContentByName(currentuser);
      console.log(userProfileData)
      console.log(user);
    }
  }, []);
  return (
    <div>
      <div
        className="img-container"
        style={{
          display: "flex",
          justifyContent: "start",
          flexWrap: "wrap",
        }}
      >
        {userProfileData !== null
  ? (userProfileData.images.length > 0 ? userProfileData.images.map((product) => (
      <div key={product._id}> 
        {product.mediaType !== "video/mp4" ? (
          <img
            src={product.imageUrl}
            alt="img"
            style={{
              height: "250px",
              width: "250px",
              margin: "4px",
              backgroundSize: "cover",
            }}
          />
        ) : (
          <video
            className="video-post"
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              margin: "4px",
            }}
            controls
          >
            <source src={product.imageUrl} key={`${product._id}-source`} /> {/* Unique key for <source> */}
          </video>
        )}
      </div>
    ))
  : (userProfileData.User.username === user.username ? <div className="my-5" style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center", flexDirection:"column"}}><h3>You have not created anything yet</h3> </div>  : "")): null}

      </div>
    </div>
  );
}
