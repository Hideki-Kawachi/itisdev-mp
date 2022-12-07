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
import InventoryCreate from "../../components/Inventory/InventoryCreate";

function Tabs() {
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<div className="container">
				<div
					className={toggleState === 1 ? "content  active-content" : "content"}
				>
					<InventoryCreate> </InventoryCreate>
				</div>

				<div
					className={toggleState === 2 ? "content  active-content" : "content"}
				>
					<BasicTablePull> </BasicTablePull>

					{/* First Field Group */}
					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">Pull-out Date: </label> <br />
							<input
								type="date"
								className="form-fields"
								placeholder="Acquired Date"
							/>
						</div>

						<div className="form-item">
							<label className="form-labels">
								Job Order Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input
								type="text"
								className="form-fields"
								placeholder="Enter Job Order Number"
							/>
						</div>

						<div className="form-item">
							<label className="form-labels">
								Plate Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<button
								className="vehicle-icon-button vehicle-add-option-button "
								onClick={() => setTrigger(!trigger)}
							>
								{" "}
								✎{" "}
							</button>
							<br />
							<select className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Mechanic Name: <label className="required"> * </label>{" "}
							</label>{" "}
							<button
								className="vehicle-icon-button vehicle-add-option-button "
								onClick={() => setTrigger(!trigger)}
							>
								{" "}
								✎{" "}
							</button>
							<br />
							<select className="form-fields" />
						</div>
					</div>
					<hr />

					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Item Code: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Item Name: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Brand: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Part Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Quantity: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Unit: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>
					<br />
					<button className="gray-button-container1"> Add to Pull Cart</button>
					<hr />
					<br />
					<div className="form-item">
						<label className="form-labels">Remarks:</label> <br />
						<input type="textarea" className="form-fields-remarks" />
					</div>
				</div>
		</div>
	);
}
export default Tabs;
