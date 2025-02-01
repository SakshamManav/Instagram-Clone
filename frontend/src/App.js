import React , {useState, useEffect} from "react";
import Leftsection from "./components/Leftsection";
import Middlesection from "./components/Middlesection";
import Rightsection from "./components/Rightsection";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./Context/Usercontext";
import Upload from "./components/Upload";
import Messages from "./components/Messages";
import Chatspage from "./components/Chatspage";
import Explore from "./components/Explore";
import Search from "./components/Search";
import Reels from "./components/Reels";
// import "./App.css";
function MainLayout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  
    
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 700);
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    <div style={{ display: "flex" }}>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Leftsection className="left-section" />
      )}
      <div className="main-content" style={{display: "flex", width:"100%",}}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Middlesection />
                <Rightsection />
              </>
            }
          />
          <Route path="/profile/:currentuser" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/messages" element={<> <Messages/> </> } />
          <Route path="/search" element={<Search/>} />
          <Route path="/reels" element={<Reels/>} />
          <Route path="/messages/:currentuser" element={<> <Messages/> <Chatspage/> </>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <MainLayout />
      </Router>
    </UserProvider>
  );
}

export default App;
