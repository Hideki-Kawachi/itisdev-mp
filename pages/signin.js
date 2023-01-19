import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/config";
import dbConnect from "../lib/dbConnect";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			return {
				redirect: { destination: "/", permanent: true },
				props: {},
			};
		} else {
			await dbConnect();

			return {
				props: {},
			};
		}
	},
	ironOptions
);

function SignIn() {
	const [employeeID, setEmployeeID] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(false);
	const router = useRouter();
	// useEffect(()=>console.log(employeeID),[employeeID])

	function submitForm() {
		let userData = {
			employeeID: employeeID,
			password: password,
			disabled: isDisabled,
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
				if (data === "Logged in") {
					console.log("SUCCESS");
					console.log("SESSION IS", data);
					router.replace("/");
				} else {
					console.log("ERROR IS:", data);
					setError(true);
				}
			});
	}

	function showInvalidCredsError() {
		if (error) {
			return <span className="login-error">Invalid credentials</span>;
		}
	}

	return (
		<>
			<div id="main-container">
				<h1 className="signin-title">
					<div className="input-container">
						<Image src="/Milaor.png" width="410px" height="410px"></Image>
					</div>
					<div className="input-container">Milaor Trading Corporation</div>
				</h1>
				<div className="input-container">
					<input
						className="green-button-container login-size"
						type="button"
						value="Login"
						onClick={submitForm}
					/>
				</div>
			</div>
		</>
	);
}

export default SignIn;
