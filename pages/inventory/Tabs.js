import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import BasicTableAdd from "../../components/Inventory/InventoryTable";
import BasicTablePull from "../../components/Inventory/InventoryTablePull";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import AddInventoryCreate from "../../components/Inventory/AddInventoryCreate";
import PullInventoryCreate from "../../components/Inventory/PullInventoryCreate";

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
					onClick={() => toggleTab(1)}
				>
					ADD
				</button>
				<button
					className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(2)}
				>
					PULL-OUT
				</button>
			</div>

				<div
					className={toggleState === 1 ? "content  active-content" : "content"}
				>
					<AddInventoryCreate> </AddInventoryCreate>
				</div>

				<div
					className={toggleState === 2 ? "content  active-content" : "content"}
				>
					<PullInventoryCreate> </PullInventoryCreate>

				</div>
		</div>
	);
}
export default Tabs;
