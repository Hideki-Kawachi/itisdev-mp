import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import Tabs from "./Tabs";


function Inventory() {
	return (
		<>
			<Header
				page={"INVENTORY"}
				subPage={"HOME"}
				user={"Example N. Name"}
			></Header>
            <div id="main-container">
				<div className="main-container-bg">
					<br/>
					<div className="App">
                        <Tabs />
                    </div>
				</div>
			</div>
			<NavBar></NavBar>
            
		</>
	);
}

export default Inventory;