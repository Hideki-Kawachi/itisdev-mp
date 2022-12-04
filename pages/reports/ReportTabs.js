import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";

function ReportTabs(props) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleState, setToggleState] = useState(props.tab);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<div className="container">
			<div className="bloc-tabs">
				<Link href="/reports">
					<button
						className={toggleState == 1 ? "tabs active-tabs" : "tabs"}
						onClick={() => 
							toggleTab(1)
						}
					>
						Transaction
					</button>
				</Link>
				<Link href="/reports/inventoryRep">
					<button
						className={toggleState == 2 ? "tabs active-tabs" : "tabs"}
						onClick={() => 
							toggleTab(2)
						}
					> Inventory
					</button>
				</Link>
				<Link href="/reports/vecRep">
					<button
						className={toggleState == 3 ? "tabs active-tabs" : "tabs"}
						onClick={() => toggleTab(3)}
					>
						Vehicles
					</button>
				</Link>
				<Link href="/reports/suppliesRep">
					<button
						className={toggleState == 4 ? "tabs active-tabs" : "tabs"}
						onClick={() => toggleTab(4)}
					>
						Supplier
					</button>
				</Link>
			</div>

		</div>
	);
}
export default ReportTabs;
