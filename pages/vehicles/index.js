import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import BasicTable from "../../components/Vehicles/VehicleTable";

function Vehicles() {
	return (
		<>
			<Header
				page={"VEHICLES"}
				subPage={"HOME"}
				user={"Example N. Name"}
			></Header>
			<NavBar></NavBar>
			<div id="main-container">
				<div className="main-container-bg">
					<br/>
					<BasicTable> </BasicTable>
				</div>
			</div>
		</>
	);
}

export default Vehicles;
