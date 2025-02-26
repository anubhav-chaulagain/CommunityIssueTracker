import { useEffect, useState } from "react";
import Sheild from "../assets/icons/verify.svg";
import { updateProfile, getUserData } from "../http";
import { useOutletContext } from "react-router-dom";

export default function Settings() {
  const { sidebarActive } = useOutletContext()
  const [userData, setUserData] = useState({});
  const [invalidField, setInvalidField] = useState({ errorField: "", message: "" });
  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data.user);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());


    console.log("Data:", data);
    updateProfile(data)
      .then((response) => {
        console.log("Profile updated:", response);
        if(response.errorField){
          setInvalidField(response);
        }
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  }
  
  return (
    <main className={`settings ${!sidebarActive ? "active" : ""}`}>
      <form onSubmit={handleSubmit}>
        <div className="head">
          <h1>Settings</h1>
          <button  className="saveChangesBtn">
            Save Changes
          </button>
        </div>

        <div className="profileSettings">
          <h3 className="title">Profile Settings</h3>

          <div className="inputGrid">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                defaultValue={userData.name}
                className="inputField"
                name="name"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                defaultValue={userData.email}
                className="inputField"
                disabled
                name="email"
              />
            </div>
          </div>
        </div>

        <div className="privacySecurity">
          <h2 className="privacySecurity-title">
            <i className="shield-icon">
              <img src={Sheild} alt="" />
            </i>{" "}
            Privacy & Security
          </h2>

          <div className="privacySecurity-inputGroup">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              placeholder="Current Password"
              name="currentPassword"
              className={invalidField.errorField==="currentPassword"?'errorInput':null}
            />
            {invalidField.errorField === "currentPassword" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
          </div>
          
          <div className="privacySecurity-inputGroup">
            <input
              type="password"
              id="new-password"
              placeholder="New Password"
               name="newPassword"
               className={invalidField.errorField==="newPassword"?'errorInput':null}
            />
            {invalidField.errorField === "newPassword" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
          </div>

          <div className="privacySecurity-inputGroup">
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              className={invalidField.errorField==="confirmPassword"?'errorInput':null}
            />
            {invalidField.errorField === "confirmPassword" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
          </div>
        </div>
      </form>
    </main>
  );
}
