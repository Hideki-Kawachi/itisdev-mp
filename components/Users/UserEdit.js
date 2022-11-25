import React, { useEffect, useState } from "react";
import BasicButton from "../BasicButton";
import ToggleSwitch from "../ToggleSwitch";
import Modal from "react-modal";

Modal.setAppElement("#main-container");

function UserEdit({ roles, userID, setShow, setEditing, setNotifResult }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [roleID, setRoleID] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const currentUserID = "00000000";

	useEffect(() => {
		console.log("EDITING:", userID);
		fetch("/api/findUser/" + userID, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("RECEIVED DATA:", data);
				setFirstName(data.firstName);
				setLastName(data.lastName);
				setPassword(data.password);
				setRoleID(data.roleID);
				setIsDisabled(data.disabled);
			});
	}, [userID]);

	function deleteUser() {
		fetch("/api/deleteUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userID: userID }),
		})
			.then((res) => res.json())
			.then((data) => {
				setModalOpen(false);
				setNotifResult(data);
				if (data != "User Deletion Failed") {
					setTimeout(() => window.location.reload(), 800);
				}
			});
	}

	function cancelForm() {
		setShow("button");
		setEditing("");
	}

	function submitForm() {
		if (
			firstName.length == 0 ||
			lastName.length == 0 ||
			password.length == 0 ||
			roleID.length == 0
		) {
			setError(true);
		} else {
			let userData = {
				userID: userID,
				firstName: firstName,
				lastName: lastName,
				password: password,
				roleID: roleID,
				disabled: isDisabled,
			};

			fetch("/api/editUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			})
				.then((res) => res.json())
				.then((data) => {
					setNotifResult(data);
					if (data != "No Fields Edited") {
						setTimeout(() => window.location.reload(), 800);
					}
				});
		}
	}

	useEffect(() => {
		console.log("ROLE ID IS:", roleID);
	}, [roleID]);

	return (
		<>
			<Modal isOpen={modalOpen} className="item-modal-bg">
				<div className="user-modal-container">
					<div className="user-modal-exit-button-container">
						<button
							className="user-modal-exit-button"
							onClick={() => setModalOpen(false)}
						>
							X
						</button>
					</div>

					<div className="user-modal-text-container">
						<span>Are you sure you want to delete user</span>
						<span>
							{firstName} {lastName} ?
						</span>
					</div>
					<div className="user-modal-button-container">
						<BasicButton
							label={"No"}
							color={"gray"}
							type={"button"}
							clickFunction={() => setModalOpen(false)}
						></BasicButton>
						<BasicButton
							label={"Yes"}
							color={"red"}
							type={"button"}
							clickFunction={deleteUser}
						></BasicButton>
					</div>
				</div>
			</Modal>
			<form className="user-create-main-container">
				<div className="user-create-top-container">
					<h1>EDIT USER</h1>
					<button className="user-create-exit-button" onClick={cancelForm}>
						<svg
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.2732 0.875369C11.8209 1.42306 11.8209 2.31104 11.2732 2.85874L8.05752 6.07441L11.2732 9.29009C11.8209 9.83778 11.8209 10.7258 11.2732 11.2735C10.7255 11.8211 9.83751 11.8211 9.28982 11.2735L6.07415 8.05778L2.85847 11.2735C2.31078 11.8211 1.4228 11.8211 0.875105 11.2735C0.327413 10.7258 0.327413 9.83778 0.875105 9.29009L4.09078 6.07441L0.875106 2.85874C0.327413 2.31104 0.327414 1.42306 0.875106 0.875368C1.4228 0.327676 2.31078 0.327676 2.85847 0.875368L6.07415 4.09104L9.28982 0.875368C9.83751 0.327677 10.7255 0.327677 11.2732 0.875369Z"
								fill="white"
							/>
						</svg>
					</button>
				</div>
				<label htmlFor="employeeID">Employee ID:</label>
				<input type="Number" id="employeeID" value={userID} disabled></input>
				<label htmlFor="firstName">
					First Name: <span className="required-mark">*</span>
				</label>
				<input
					type="text"
					id="firstName"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				></input>
				{error && firstName.length == 0 ? (
					<span className="user-create-error">Input First Name</span>
				) : (
					<></>
				)}
				<label htmlFor="lastName">
					Last Name: <span className="required-mark">*</span>
				</label>
				<input
					type="text"
					id="lastName"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				></input>
				{error && lastName.length == 0 ? (
					<span className="user-create-error">Input Last Name</span>
				) : (
					<></>
				)}
				<label htmlFor="password">
					Password: <span className="required-mark">*</span>
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				{error && password.length == 0 ? (
					<span className="user-create-error">Input Password</span>
				) : (
					<></>
				)}
				<label htmlFor="role">
					Role: <span className="required-mark">*</span>
				</label>
				<select
					className="sort-dropdown"
					id="user-create-role"
					onChange={(e) => setRoleID(e.target.value)}
				>
					{roles.map((role) => {
						if (role.roleID == roleID) {
							return (
								<option key={role.roleID} value={role.roleID} selected>
									{role.roleName}
								</option>
							);
						} else {
							return (
								<option key={role.roleID} value={role.roleID}>
									{role.roleName}
								</option>
							);
						}
					})}
				</select>
				<span>Status:</span>
				<ToggleSwitch
					disabled={isDisabled}
					setDisabled={setIsDisabled}
				></ToggleSwitch>
				<div className="user-create-button-container">
					<BasicButton
						label={"Save"}
						color={"green"}
						type={"button"}
						clickFunction={submitForm}
					></BasicButton>
					<div className="horizontal-container">
						<BasicButton
							label={"Delete"}
							color={"red"}
							type={"button"}
							clickFunction={() => setModalOpen(true)}
						></BasicButton>
						<BasicButton
							label={"Cancel"}
							color={"gray"}
							type={"reset"}
							clickFunction={cancelForm}
						></BasicButton>
					</div>
				</div>
			</form>
		</>
	);
}

export default UserEdit;
