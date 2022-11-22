import React, {useEffect } from "react";
import { FormEventHandler, useState } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";

function SignIn() {
	const logo = require("../public/Milaor.png");

    const [employeeID, setEmployeeID] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState(false);
    useEffect(()=>console.log(employeeID),[employeeID])

    function submitForm(){

               //Put BCrypt here

        let userData = {
            employeeID: employeeID,
            password: password,
            disabled: isDisabled
        };



        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("SUCCESS");
                } else {
                    console.log("hi");
                    setError(true);
                }
            });

    }

	function showEmployeeIDError() {
		if (error) {
            return ( <span className="login-error" >Invalid User</span>);
		}
	}

    function showPasswordIDError() {
		if (error) {
            return ( <span className="login-error" >Invalid Password</span>);
		}
	}

	return (
		<>
			<NavBar></NavBar>
			<div id="main-container">
				<h1 className="signin-title">
					<div className="input-container">
						<Image src="/Milaor.png" width="410px" height="410px"></Image>
					</div>
					<div className="input-container">Milaor Trading Corporation</div>
				</h1>
                <form className="signin-form">
                    <div className="input-container">
                        <div className="label-cont">Employee ID:</div>
                        <input
                            type="employeeID"
                            name="employeeID"
                            placeholder="Enter Employee ID"
                            onChange={(e) => setEmployeeID(e.target.value)}
                        ></input>
                        {showEmployeeIDError()}
                    </div>
                    <div className="input-container">
                        <div className="label-cont">Password:</div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        {showPasswordIDError()}
                    </div>
                    <div className="input-container">
                        <input
                            className="green-button-container login-size"
                            type="button"
                            value="Login"
                            onClick={submitForm}
                        />
                    </div>
                </form>
			</div>
        
		</>
	);
}

export default SignIn;
