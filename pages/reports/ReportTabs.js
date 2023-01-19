import { useState } from "react";
import Link from "next/link";
import React from "react";

function ReportTabs(props) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleState, setToggleState] = useState(props.tab);
	const [currentRole, setRole] = useState(props.roleID);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	function showAudit() {
		if (currentRole == "0000") {
			return (
				<Link href="/reports/audit">
					<button
						className={toggleState == 3 ? "tabs active-tabs" : "tabs"}
						onClick={() => toggleTab(3)}
					>
						Audit
					</button>
				</Link>
			);
		}
	}

	return (
		<div className="container">
			<div className="bloc-tabs">
				<Link href="/reports">
					<button
						className={toggleState == 1 ? "tabs active-tabs" : "tabs"}
						onClick={() => toggleTab(1)}
					>
						Add Inventory
					</button>
				</Link>
				<Link href="/reports/pullRep">
					<button
						className={toggleState == 2 ? "tabs active-tabs" : "tabs"}
						onClick={() => toggleTab(2)}
					>
						{" "}
						Pull-Out Inventory
					</button>
				</Link>
				{showAudit()}
			</div>
		</div>
	);
}
export default ReportTabs;
