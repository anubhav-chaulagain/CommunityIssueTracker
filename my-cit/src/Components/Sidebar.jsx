// import { useState } from "react";

import Plus from "../assets/icons/plus.svg";
import File from "../assets/icons/file.svg";
import Marker from "../assets/icons/marker.svg";
import Resolved from "../assets/icons/resolved.svg";
import Setting from "../assets/icons/setting.svg";

export default function Sidebar({
  activeSidebar,
  handleSidebar,
  sidebarActive
}) {
  return (
    <aside className="sidebar">
      <div className={`reportIssueBtn  ${!sidebarActive?"reduced":""}`} onClick={() => handleSidebar("reportIssues")}>
        <span className="iconSpan">
          <img src={Plus} alt="plus svg" />
        </span>
        {sidebarActive && (
          <span className="spanText">
            <span>Report an Issue</span>
          </span>
        )}
      </div>
      <div
        className={`dashboardBtn ${
          activeSidebar === "dashboard" ? "active" : ""
        } ${!sidebarActive?"reduced":""}`}
        onClick={() => handleSidebar("dashboard")}
      >
        <span className="iconSpan">
          <img src={File} alt="file svg" />
        </span>
        {sidebarActive && (
          <span className="spanText">
            <span>Dashboard</span>
          </span>
        )}
      </div>
      <div
        className={`myReportsBtn ${
          activeSidebar === "myReports" ? "active" : ""
        } ${!sidebarActive?"reduced":""}`}
        onClick={() => handleSidebar("myReports")}
      >
        <span className="iconSpan">
          <img src={Marker} alt="file svg" />
        </span>
        {sidebarActive && (
          <span className="spanText">
            <span>My Reports</span>
          </span>
        )}
      </div>
      <div
        className={`resolvedBtn ${
          activeSidebar === "resolved" ? "active" : ""
        }  ${!sidebarActive?"reduced":""}`}
        onClick={() => handleSidebar("resolved")}
      >
        <span className="iconSpan">
          <img src={Resolved} alt="file svg" />
        </span>
        {sidebarActive && (
          <span className="spanText">
            <span>Resolved</span>
          </span>
        )}
      </div>
      <div
        className={`settingsBtn ${
          activeSidebar === "settings" ? "active" : ""
        }  ${!sidebarActive?"reduced":""}`}
        onClick={() => handleSidebar("settings")}
      >
        <span className="iconSpan">
          <img src={Setting} alt="file svg" />
        </span>
        {sidebarActive && (
          <span className="spanText">
            <span>Settings</span>
          </span>
        )}
      </div>
    </aside>
  );
}
