export default function Navbar({ children, onMainPage, toggleSidebar, onAuthDashboard }) {
  return (
    <header className={`header ${onMainPage ? "onMainPage" : ""}${onAuthDashboard ? "ofAuthHeader" : ""}`}
>
      <h1 className="logo">
      {onMainPage && (
        <div className="hamburgerMenu" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <div className={`logoText ${onAuthDashboard && "ofAuthDashboard"}`}>{onMainPage || onAuthDashboard?"Community Issue Tracker":"CIT"}</div>
      </h1>
      <ul className="navbar-items-container">{children}</ul>
    </header>
  );
}
