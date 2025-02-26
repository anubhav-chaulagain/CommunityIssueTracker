import { useState } from "react";
import { login } from "../http";
import { Link } from "react-router-dom";

export default function Login() {
  const [invalidField, setInvalidField] = useState({
    name: "",
    message: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.email === "") {
      setInvalidField({
        name: "email",
        message: "Email cannot be empty!",
      });
      return;
    }
    if (data.password === "") {
      setInvalidField({
        name: "password",
        message: "Password cannot be empty!",
      });
      return;
    }
    if (data.password.length < 8) {
      setInvalidField({
        name: "password",
        message: "Password must be at least 8 characters long!",
      });
      return;
    }

    login({ email: data.email, password: data.password })
      .then((response) => {
        if (response && response.json) {
          return response.json(); // ✅ Ensure response is a valid JSON response
        }
        return response; // If it's already JSON, return as is
      })
      .then((data) => {
        console.log("Login Response:", data); // ✅ Debugging

        if (data.errorType === "bothEmpty") {
          setInvalidField({ name: "email", message: data.message });
          setInvalidField({ name: "password", message: data.message });
        } else if (data.errorType === "email") {
          setInvalidField({ name: "email", message: data.message });
        } else if (data.errorType === "password") {
          setInvalidField({ name: "password", message: data.message });
        }
      })
      .catch((error) => console.error("Error:", error)); // ✅ Catch unexpected errors
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1>Login Up</h1>
      <div className="labelInputContainer">
        <label htmlFor="email">Email</label>
        <input
          className={invalidField.name === "email" ? "errorInput" : null}
          type="email"
          name="email"
          id="email"
        />
        {invalidField.name === "email" ? (
          <p className="errorMsg">{invalidField.message}</p>
        ) : null}
      </div>
      <div className="labelInputContainer">
        <label htmlFor="password">Password</label>
        <input
          className={invalidField.name === "password" ? "errorInput" : null}
          type="password"
          name="password"
          id="password"
        />
        {invalidField.name === "password" ? (
          <p className="errorMsg">{invalidField.message}</p>
        ) : null}
      </div>
      <div className="labelInputContainer">
        <button>Login</button>
      </div>
      <Link to={'/signup'} className="formBottomText">Create a new account ?</Link>
    </form>
  );
}
