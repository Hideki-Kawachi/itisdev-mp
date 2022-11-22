import React from "react";
import { FormEventHandler, useState } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";

function SignIn() {
	const logo = require("../public/Milaor.png");

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
                <form className="signin-form" action="/api/login" method="post">
                    <div className="input-container">
                        <div className="label-cont">Employee ID:</div>
                        <input
                            type="userID"
                            name="userID"
                            placeholder="Enter Employee ID"
                        ></input>
                    </div>
                    <div className="input-container">
                        <div className="label-cont">Password:</div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                        ></input>
                    </div>
                    <div className="input-container">
                        <input
                            className="green-button-container login-size"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
			</div>
		</>
	);
}

export default SignIn;
