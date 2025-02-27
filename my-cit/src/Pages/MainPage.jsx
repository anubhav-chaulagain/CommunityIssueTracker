import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

import { ChevronDown } from "lucide-react";

import Navbar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";
export default function MainPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          credentials: "include",
        });
  
        if (!res.ok) return null;
  
        const data = await res.json();
        return data.user;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    };
  
    getUser().then((user) => {
      if (!user) {
        navigate("/login");
        return;
      }
      setUserName(user.name);
      
      // Redirect authority users to their dashboard
      if (user.role === "Authority") {
        navigate("/authority"); 
      }
    });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract the last part of the URL to set the activeSidebar state
  const currentPath = location.pathname.split("/").pop();

  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [sidebarActive, setSidebarActive] = useState(false);

  function handleSidebar(bar) {
    setActiveSidebar(bar);
    navigate(`/main/${bar}`);
  }

  function toggleSidebar() {
    setSidebarActive((prev) => !prev);
  }

  useEffect(() => {
    if (!currentPath) {
      navigate("/main/dashboard"); // Default route
    }
  }, [currentPath]);

  function justLogout() {
    fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
        }
      })
      .catch((error) => console.error("Error logging out:", error));
  }

  return (
    <>
      <Navbar onMainPage={true} toggleSidebar={toggleSidebar}>
        <Link to={"/main/settings"} className="profileIcon">
          {userName}
          <ChevronDown className="!mt-2 !pl-0.5" />
        </Link>
        <Link className="!text-base hover:text-indigo-100" onClick={justLogout}>LogOut</Link>
      </Navbar>
      <div className="bodyItems">
        <Sidebar
          activeSidebar={activeSidebar}
          handleSidebar={handleSidebar}
          sidebarActive={sidebarActive}
        ></Sidebar>
        <Outlet context={{ sidebarActive }} />
      </div>
    </>
  );
}
