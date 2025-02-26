import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";
import Reports from "../Components/Reports";
import Resolved from "../Components/Resolved";
import Settings from "../Components/Settings";
import ReportIssues from "../Components/ReportIssues";
export default function MainPage() {
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
  }, []);

  return (
    <>
      <Navbar onMainPage={true} toggleSidebar={toggleSidebar}>
        <li className="profileIcon">Ace</li>
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
