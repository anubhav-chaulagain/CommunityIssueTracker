import { Link } from "react-router-dom";
import Navbar from "../Components/NavBar";
export default function LandingPage() {
  return (
    <>
      <Navbar onMainPage={false}>
        <Link to={'/login'} className="login">Login</Link>
        <Link to={'/signup'}  className="signup">Sign up</Link>
      </Navbar>
      <main className="landing-hero">
        <div className="textContent">
          <p>Report, Resolve, Revive</p>
          <p>
            Every issue deserves attention. Report problems, collaborate
            <br /> for solutions, and build a stronger community.
          </p>
          <Link to={'/signup'} className="getStartedBtn">
            Get Started
          </Link>
        </div>
        <div className="image">
          <img src="/communityIssues.jpeg" alt="Community Issues Image" />
        </div>
      </main>
    </>
  );
}
