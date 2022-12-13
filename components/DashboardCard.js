import React from "react";

function DashboardCard({ itemName, itemModel, quantity }) {
	return (
		<div className="dashboard-card-main-container">
			<div className="dashboard-card-left-container">
				<h1>{itemName}</h1>
				<span>{itemModel}</span>
			</div>
			<h1 className="dashboard-card-count">{quantity}</h1>
		</div>
	);
}

export default DashboardCard;
