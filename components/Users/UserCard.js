import React, { useEffect, useRef, useState } from "react";
import ToggleSwitch from "../ToggleSwitch";

function UserCard({
	userID,
	lastName,
	firstName,
	roleName,
	disabled,
	setEditing,
}) {
	const [isDisabled, setIsDisabled] = useState(disabled);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			fetch("/api/editUserToggle", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userID: userID, disabled: isDisabled }),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log("Response from toggle is:", data);
				});
		} else {
			isMounted.current = true;
		}
	}, [isDisabled]);

	return (
		<div className="user-card-main-container">
			<div className="text-container">
				<span style={{ fontWeight: 700 }}>
					{lastName}, {firstName}
				</span>
				<span style={{ fontSize: "18px", fontWeight: 300 }}>{roleName}</span>
			</div>
			<div className="buttons-container">
				{
					<ToggleSwitch
						disabled={isDisabled}
						setDisabled={setIsDisabled}
					></ToggleSwitch>
				}

				<svg
					className="edit-button"
					viewBox="0 0 46 41"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					onClick={() => setEditing(userID)}
				>
					<path
						d="M32.0833 0H13.75C6.16688 0 0 5.49412 0 12.25V38.7917C0 39.3331 0.241443 39.8525 0.671214 40.2353C1.10098 40.6182 1.68388 40.8333 2.29167 40.8333H32.0833C39.6665 40.8333 45.8333 35.3392 45.8333 28.5833V12.25C45.8333 5.49412 39.6665 0 32.0833 0ZM16.0394 30.625H11.4583V26.5437L24.1313 15.2696L28.7123 19.3509L16.0394 30.625ZM30.8733 17.4256L26.2923 13.3443L29.7848 10.2349L34.3658 14.3162L30.8733 17.4256Z"
						fill="black"
					/>
				</svg>
			</div>
		</div>
	);
}

export default UserCard;
