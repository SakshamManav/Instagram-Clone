import React, { useContext, useEffect, useState } from "react";
import "./LeftSection.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "./Upload";
import { UserContext } from "../Context/Usercontext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function LeftSection() {
  const context = useContext(UserContext);
  const { setUploaded, user, getUser } = context;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);


  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle open state
  };

  const closeNavbar = () => {
    setIsOpen(false); // Close the navbar
  };

  function check() {
    if (localStorage.getItem("authToken") === null) {
      navigate("/login");
    } else {
      getUser();
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1100);
    };

    // Set initial screen size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      <div>
        {isSmallScreen && <button
          type="button"
          className="left-menu-btn"
          onClick={toggleNavbar}
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "1050",
            backgroundColor:"pink",
            borderRadius:"2px",
            fontSize:"25px",
            display:isOpen ? "none" : "block" 
          }}
        >
          <i className="fa-solid fa-bars"></i> 
        </button>
        }
        <div
          className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
          tabIndex="-1"
          style={{
            visibility: isOpen ? "visible" : "hidden",
            backgroundColor: "#d62976", 
            color:"black",
          }}
        >
          <div className="offcanvas-header" style={{display:"flex", alignItems:"center"}}>
          <h1> Menu </h1>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={closeNavbar}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
            <Link className="leftNavContainers btn" to="/"  onClick={closeNavbar}>
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-house"
                  style={{ fontSize: "23px",color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                >
                  Home
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to={`/messages`}  onClick={closeNavbar}>
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-message"
                  style={{ fontSize: "23px", color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                >
                  Messages
                </span>
              </li>
            </Link>
            <Link
              className="leftNavContainers btn"
              to={`/profile/${user === null ? "" : user.username}`}
              onClick={closeNavbar}
            >
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "23px", color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                >
                  Profile
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to="/explore"  onClick={closeNavbar}>
              <li className="d-flex align-items-center">
                <i
                  className="fa-regular fa-compass"
                  style={{ fontSize: "23px", color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                >
                  Explore
                </span>
              </li>
            </Link>
            <Link
              className="leftNavContainers btn"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={closeNavbar}
            >
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-plus"
                  style={{ fontSize: "23px", color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                  onClick={setUploaded(false)}
                >
                  Create
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to="/search"  onClick={closeNavbar}>
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ fontSize: "23px", color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                >
                  Search
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to="/reels"  onClick={closeNavbar}>
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-video"
                  style={{ fontSize: "23px", color:"white" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold", color:"white" }}
                >
                  Reels
                </span>
              </li>
            </Link>
            </ul>
          </div>
        </div>
      </div>

      {/*--------------Left Navbar Ended here------------------- */}

      <div className="container1">
        <Link className="logo-container" to="/">
          <img
            src="/images/instagram-logo-illustration-removebg-preview.png"
            alt="img"
            className="instaLogo"
            style={{ cursor: "pointer" }}
          />
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="leftNavContainers btn" to="/">
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-house"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Home
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to={`/messages`}>
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-message"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Messages
                </span>
              </li>
            </Link>
            <Link
              className="leftNavContainers btn"
              to={`/profile/${user === null ? "" : user.username}`}
            >
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Profile
                </span>
              </li>
            </Link>
            <Link
              className="leftNavContainers btn"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-plus"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  onClick={setUploaded(false)}
                >
                  Create
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to="/search">
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Search
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to="/explore">
              <li className="d-flex align-items-center">
                <i
                  className="fa-regular fa-compass"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Explore
                </span>
              </li>
            </Link>
            <Link className="leftNavContainers btn" to="/reels">
              <li className="d-flex align-items-center">
                <i
                  className="fa-solid fa-video"
                  style={{ fontSize: "23px" }}
                ></i>
                <span
                  className="nav-link active mx-3"
                  aria-current="page"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Reels
                </span>
              </li>
            </Link>
            
          

           
          </ul>
        </div>
      </div>

      <Upload />
    </>
  );
}
