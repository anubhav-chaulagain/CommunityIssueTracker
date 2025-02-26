import Navbar from "../Components/NavBar";
export default function LandingPage() {
  return (
    <>
      <Navbar onMainPage={false}>
        <li className="login">Login</li>
        <li className="signup">Sign up</li>
      </Navbar>
      <main className="landing-hero">
        <div className="textContent">
          <p>Report, Resolve, Revive</p>
          <p>
            Every issue deserves attention. Report problems, collaborate
            <br /> for solutions, and build a stronger community.
          </p>
          <a href="" className="getStartedBtn">
            Get Started
          </a>
        </div>
        <div className="image">
          <img src="/communityIssues.jpeg" alt="Community Issues Image" />
        </div>
      </main>
    </>
  );
}
