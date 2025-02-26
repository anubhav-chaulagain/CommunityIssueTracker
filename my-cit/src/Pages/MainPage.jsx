import { use, useState } from "react";

import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";
import Reports from "../Components/Reports";
import Resolved from "../Components/Resolved";
import Settings from "../Components/Settings";
import ReportIssues from "../Components/ReportIssues";
export default function MainPage() {
  const [activeSidebar, setActiveSidebar] = useState("reportIssues");
  const [sidebarActive, setSidebarActive] = useState(false);

  function handleSidebar(bar) {
    setActiveSidebar(bar);
  }

  function toggleSidebar() {
    setSidebarActive((prev) => !prev);
  }

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
        {activeSidebar === "reportIssues" && <ReportIssues  sidebarActive={sidebarActive} />}
        {activeSidebar === "dashboard" && <Dashboard  sidebarActive={sidebarActive} />}
        {activeSidebar === "myReports" && <Reports  sidebarActive={sidebarActive} />}
        {activeSidebar === "resolved" && <Resolved  sidebarActive={sidebarActive} />}
        {activeSidebar === "settings" && (
          <Settings sidebarActive={sidebarActive} />
        )}
      </div>
    </>
  );
}
