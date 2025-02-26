import { NavLink } from "react-router-dom";
import Plus from "../assets/icons/plus.svg";
import File from "../assets/icons/file.svg";
import Marker from "../assets/icons/marker.svg";
import Resolved from "../assets/icons/resolved.svg";
import Setting from "../assets/icons/setting.svg";

export default function Sidebar({ sidebarActive }) {
  return (
    <aside className="sidebar">
      {/* Report an Issue (Kept as onClick since it's not a page) */}
      <NavLink
      to={"/main/reportIssue"} className={`reportIssueBtn ${!sidebarActive ? "reduced" : ""}`}>
        <span className="iconSpan">
          <img src={Plus} alt="plus svg" />
        </span>
        {sidebarActive && (
          <span className="spanText">
            <span>Report an Issue</span>
          </span>
        )}
      </NavLink>

      {/* Sidebar Navigation */}
      <NavLink
        to="/main/dashboard"
        className={({ isActive }) => `dashboardBtn ${isActive ? "active" : ""} ${!sidebarActive ? "reduced" : ""}`}
      >
        <span className="iconSpan">
          <img src={File} alt="file svg" />
        </span>
        {sidebarActive && <span className="spanText">Dashboard</span>}
      </NavLink>

      <NavLink
        to="/main/myReports"
        className={({ isActive }) => `myReportsBtn ${isActive ? "active" : ""} ${!sidebarActive ? "reduced" : ""}`}
      >
        <span className="iconSpan">
          <img src={Marker} alt="marker svg" />
        </span>
        {sidebarActive && <span className="spanText">My Reports</span>}
      </NavLink>

      <NavLink
        to="/main/resolved"
        className={({ isActive }) => `resolvedBtn ${isActive ? "active" : ""} ${!sidebarActive ? "reduced" : ""}`}
      >
        <span className="iconSpan">
          <img src={Resolved} alt="resolved svg" />
        </span>
        {sidebarActive && <span className="spanText">Resolved</span>}
      </NavLink>

      <NavLink
        to="/main/settings"
        className={({ isActive }) => `settingsBtn ${isActive ? "active" : ""} ${!sidebarActive ? "reduced" : ""}`}
      >
        <span className="iconSpan">
          <img src={Setting} alt="settings svg" />
        </span>
        {sidebarActive && <span className="spanText">Settings</span>}
      </NavLink>
    </aside>
  );
}
