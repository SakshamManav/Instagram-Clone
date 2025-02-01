import React,{useContext,useEffect, useState} from "react";
import "./Middlesection.css";
import { UserContext } from "../Context/Usercontext";
import {Link} from "react-router-dom";
export default function Middlesection() {
  const context = useContext(UserContext);
  const {user,mainUserFollowingInfo,likeContent,UnlikeContent} = context; 
  
  const [likedIds, setLikedIds] = useState(new Set());
  
  const handleLikeBtn=(ContentId)=>{
    likeContent(ContentId);
    setLikedIds(previtems=>
      new Set(previtems.add(ContentId))
    )
  }
  
  function handleUnLikeBtn(ContentId){
    
    UnlikeContent(ContentId);
    setLikedIds((previtems)=>{
      let newLikedIds = new Set(previtems);
      newLikedIds.delete(ContentId)
      return newLikedIds;
    })
    likedIds.delete(ContentId);
  }

  useEffect(() => {
    
    if(mainUserFollowingInfo){
      const newLikedIds = new Set();
      mainUserFollowingInfo.forEach((users) => {
       users.images.map((items)=>{
        items.likedAccount.map((acc)=>{
          if(acc === user._id)
          {
            newLikedIds.add(items._id)
          }
          console.log(acc);
        })
       })
      });
      setLikedIds(newLikedIds);
    }
    console.log(likedIds)
  }, [mainUserFollowingInfo]);
 
    
      
  return (
    <>
     <div className="vertical-line"></div>
      <div className="container-middleSection">
        
        
        <div className="container-middle">
        {
          
          mainUserFollowingInfo.length > 0 ?
          mainUserFollowingInfo.map((followingusers)=>{
            return(
            followingusers.images.map((image)=>{
              
              return(
                <>
            <div className="upper-post">
            <div className="d-flex align-items-center">
              <Link 
              to={`profile/${followingusers.user.username}`}>
              <img
                className="profile-icon"
                src={followingusers.user.profileimageUrl}
                alt="img"
              />
              </Link>
              <Link
              to={`profile/${followingusers.user.username}`}
                className="user-name mx-1"
                style={{
                  fontSize: "17px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  translate:"4px -8px",
                  textDecoration:"none",
                  color:"black"
                }}
              >
                {followingusers.user.username}
              </Link>

              <li style={{translate:"4px -8px"}}>5d</li>
            </div>
            <i className="fa-solid fa-ellipsis" style={{ cursor: "pointer" }}></i>
          </div>
          <div className="video-container">
          {
            image.mediaType === "video/mp4" ? 
            <video className="video-size" controls>
              <source
                src={image.imageUrl}
                alt="vid"
              />
            </video> :
            <img src={image.imageUrl} className="video-size" alt="img" />
          }
            
          </div>
          <div className="lkss-container">
            <div className="likes-share-comment">
              { likedIds.has(image._id) ?
              <i className="fa-solid fa-heart" onClick={()=>{
                handleUnLikeBtn(image._id);
              }}  style={{ fontSize: "25px", color:"red" }}></i>
                :
              <i className="fa-regular fa-heart " style={{ fontSize: "25px" }} onClick={()=>{
                handleLikeBtn(image._id);
              }}></i>
              
              
               }
            
              
              <i
                className="fa-regular fa-comment mx-1"
                style={{ fontSize: "25px" }}
              ></i>
              <i
                className="fa-solid fa-share mx-1"
                style={{ fontSize: "25px" }}
              ></i>
            </div>
          
            <div>
              <i
                className="fa-regular fa-bookmark"
                style={{ fontSize: "25px" }}
              ></i>
            </div>
           
          </div>
          <p style={{translate:"2px -10px", fontWeight:"bold"}}>{image.likedAccount.length} likes</p>
          </>
              
            )})
        )} ) : "Oops ! Nothing to see here , Follow someone to see his or her posts" 
        }
        
        </div>
      </div>
     
    </>
  );
}
