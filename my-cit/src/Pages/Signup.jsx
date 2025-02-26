import { useState } from "react";
import { signup } from "../http";

export default function Signup() {
    
    const [invalidField, setInvalidField] =useState({
        name: "",
        message: ""
    });

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        
        if(data.username==="") {
            setInvalidField({
                name: "username",
                message: "Username cannot be empty!"
            });
            return;
        }
        if(data.username.length<4) {
            setInvalidField({
                name: "username",
                message: "Username must be at least 4 characters long!"
            });
            return;
        }
        if(data.email==="") {
            setInvalidField({
                name: "email",
                message: "Email cannot be empty!"
            });
            return;
        }
        if(!data.email.includes("@gmail.com")) {
            setInvalidField({
            name: "email",
            message: "Email must be a @gmail.com address!"
            });
            return;
        }
        if(data.password==="") {
            setInvalidField({
            name: "password",
            message: "Password cannot be empty!"
            });
            return;
        }
        if(data.password.length<8) {
            setInvalidField({
            name: "password",
            message: "Password must be at least 8 characters long!"
            });
            return;
        }
        if(data.address==="") {
            setInvalidField({
                name: "address",
                message: "Address cannot be empty!"
            });
            return;
        }
        console.log("hi");
        
        signup(data).then(response => {
            console.log(response.json);
        });
        
    }

    return (
        <form className="signupForm" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="labelInputContainer">
                <label htmlFor="username">Username</label>
                <input className={invalidField.name==="username"?'errorInput':null} type="text" name="username" id="username" />
                {invalidField.name==="username"?<p className="errorMsg">{invalidField.message}</p>:null}
            </div>
            <div  className="labelInputContainer">
                <label htmlFor="email">Email</label>
                <input className={invalidField.name==="email"?'errorInput':null} type="email" name="email" id="email" />
                {invalidField.name==="email"?<p className="errorMsg">{invalidField.message}</p>:null}
            </div>
            <div  className="labelInputContainer">
                <label htmlFor="password">Password</label>
                <input className={invalidField.name==="password"?'errorInput':null} type="password" name="password" id="password" />
                {invalidField.name==="password"?<p className="errorMsg">{invalidField.message}</p>:null}
            </div>
            <div  className="labelInputContainer">
                <label htmlFor="address">Address</label>
                <input className={invalidField.name==="address"?'errorInput':null} type="text" name="address" id="address" />
                {invalidField.name==="address"?<p className="errorMsg">{invalidField.message}</p>:null}
            </div>
            <div  className="labelInputContainer">
                <label htmlFor="role">Role</label>
                <select name="role" id="role">
                    <option value="Citizen">Citizen</option>
                    <option value="Authority">Authority</option>
                </select>
            </div>
            <div  className="labelInputContainer">
                <button>Sign up</button>
            </div>
        </form>
    );
}