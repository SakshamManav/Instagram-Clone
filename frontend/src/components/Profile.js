import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { UserContext } from "../Context/Usercontext";
import { Link, useParams } from "react-router-dom";
import Post from "./Post";
import FollowersAndFollowingPopup from "./FollowersAndFollowingPopup";
export default function Profile() {
  const context = useContext(UserContext);
  const {
    user,
    updateProfilePhoto,
    userProfileData,
    getContentByName,
    followinginfo,
    setShowModal,
    followingCheck,
    setFollowingCheck,
    mainUserFollowingInfo,
    addFollowingAndFollowers,
    setUrlUser,
    deleteFollowingAndFollowers,
    getUser,
  } = context;
  const [loading, setloading] = useState(false);
  const [followLoading, setfollowLoading] = useState(false);

  async function handleFollowBtn1(userId) {
    console.log(followingCheck);
    setfollowLoading(true);
    try {
      await addFollowingAndFollowers(userId);
      setFollowingCheck(true);
      setfollowLoading(false);
    } catch (error) {
      console.log("not saved!");
    }
  }
  async function handleUnFollowBtn(userId) {
    console.log(followingCheck);
    setfollowLoading(true);
    setFollowingCheck(false);

    try {
      await deleteFollowingAndFollowers(userId);
      setFollowingCheck(false);
      setfollowLoading(false);
    } catch (error) {
      console.log("not saved!");
    }
  }

  let { currentuser } = useParams();
  function handleFileUpload(event) {
    const filesInput = event.target;
    const file = filesInput.files;
    console.log(file[0]);
    updateProfilePhoto(file[0]);
    getUser();
  }

  useEffect(() => {
    setloading(true);
    if (localStorage.getItem("authToken")) {
      getContentByName(currentuser).finally(() => {
        setloading(false);
      });
    }
    followinginfo();
    setUrlUser(currentuser);
  }, [currentuser, user]);

  useEffect(() => {
    if (mainUserFollowingInfo.length > 0) {
      const isFollowing = mainUserFollowingInfo.some(
        (followinguser) => followinguser.user.username === currentuser
      );
      setFollowingCheck(isFollowing);
    }
  }, [currentuser]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : userProfileData ? (
        <div className="profile-container">
          <div className="profile-top">
            <div className="profile-img-container">
              <img
                src={userProfileData.User.profileimageUrl}
                alt="img"
                className="profile-img"
              />
              <div className="editImage">
                {user !== null && userProfileData !== null ? (
                  user.username === userProfileData.User.username ? (
                    <input
                      style={{ fontSize: "10px", marginLeft: "40px" }}
                      onChange={(event) => {
                        handleFileUpload(event);
                      }}
                      type="file"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="profile-info-container d-flex flex-column justify-content-start mx-3">
              <div
                className="img-follow"
                style={{
                  display: "flex",
                  fontSize: "30px",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <i>
                  {" "}
                  {userProfileData !== null
                    ? userProfileData.User.username
                    : ""}
                </i>
                {user !== null && userProfileData !== null ? (
                  user.username ===
                  userProfileData.User.username ? null : !followingCheck ? (
                    <button
                      type="button"
                      className="btn btn-primary mx-3"
                      onClick={() => {
                        handleFollowBtn1(userProfileData.User._id);
                      }}
                    >
                      {followLoading ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Follow"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger mx-3"
                      onClick={() => {
                        handleUnFollowBtn(userProfileData.User._id);
                      }}
                    >
                      {followLoading ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "UnFollow"
                      )}
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>

              <div
                className="followers-following-posts mt-3 mx-2"
                style={{ justifyContent: "space-between" }}
              >
                <div className="d-flex" style={{ fontWeight: "700" }}>
                  <span>
                    {userProfileData !== null ? userProfileData.postcount : ""}
                    &nbsp;
                  </span>
                  <p>Posts</p>
                </div>
                <Link
                  onClick={() => {
                    followinginfo();
                    setShowModal(true);
                  }}
                  className="d-flex"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropFollowers"
                  style={{
                    fontWeight: "700",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <span>
                    {userProfileData !== null
                      ? userProfileData.User.followers.length
                      : ""}
                    &nbsp;
                  </span>
                  <p>Followers</p>
                </Link>
                <Link
                  onClick={() => {
                    followinginfo();
                    setShowModal(true);
                  }}
                  className="d-flex"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropFollowing"
                  style={{
                    fontWeight: "700",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <span>
                    {userProfileData !== null
                      ? userProfileData.User.following.length
                      : ""}
                    &nbsp;
                  </span>
                  <p> Following</p>
                </Link>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="profile-bottom">
            <div className="post-saved-tagged ">
              <Link
                className="d-flex align-items-center "
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-solid fa-table-cells mx-2"></i>
                <span>Posts</span>
              </Link>
              <Link
                className="d-flex align-items-center "
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-regular fa-bookmark mx-2"></i>
                <span>Saved</span>
              </Link>
              <Link
                className="d-flex align-items-center "
                style={{ color: "black", textDecoration: "none" }}
              >
                <i className="fa-regular fa-id-badge mx-2"></i>
                <span>Tagged</span>
              </Link>
            </div>
          </div>
          <Post />
        </div>
      ) : null}
      <FollowersAndFollowingPopup
        data="Followers"
        modalId="staticBackdropFollowers"
      />
      <FollowersAndFollowingPopup
        data="Following"
        modalId="staticBackdropFollowing"
      />
    </>
  );
}
