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

function Tabs() {
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<div className="container">
			<div className="bloc-tabs">
				<button
					className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
					onClick={() => 
						toggleTab(1)
					}
				>
					Transaction
				</button>
				<button
					className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(2)}
				>
					Inventory
				</button>
				<button
					className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(3)}
				>
					Vehicles
				</button>
				<button
					className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(4)}
				>
					Supplier
				</button>
			</div>

		</div>
	);
}
export default Tabs;
