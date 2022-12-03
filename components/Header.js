import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ironOptions } from "../lib/config";
import BasicButton from "./BasicButton";

function Header({ page, subPage, user }) {
	const router = useRouter();

	function logout() {
		fetch("/api/logout", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("DATA FROM LOGOUT IS:", data);
				router.replace("/signin");
			});
	}

	return (
		<>
			<div id="main-header-container">
				<div id="page-text-container">
					<span id="main">{page}</span>
					<span id="sub">{subPage}</span>
				</div>
				<div id="user-container">
					<div id="text">
						<span>Hello,</span>
						<span>
							{user.lastName}, {user.firstName}
						</span>
					</div>
					<BasicButton
						label={"Log Out"}
						color={"red"}
						clickFunction={logout}
						type={"button"}
					></BasicButton>
				</div>
			</div>
		</>
	);
}

export default Header;
