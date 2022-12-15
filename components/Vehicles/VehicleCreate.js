import React, { useState } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import VCatTable from "../../components/Vehicles/vCategoryList";
import Modal from "react-modal";
import Cancel from "../../components/Pop-up/cancel";
import Info from "../../components/Pop-up/info";

function VehicleCreate({
	vtype,
	brand,
	engine,
	sensor,
	transmission,
	gpsDATA,
	currentUser,
}) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [vTypeOpen, setvTypeOpen] = useState(false);
	const [otype, setOType] = useState();
	const [name, setName] = useState("");
	const [cancel, setCancel] = useState(false);
	const [plateNum, setPlateNum] = useState("");
	const [vehicleTypeID, setVehicleTypeID] = useState("");
	const [brandID, setBrandID] = useState("");
	const [manufacturingYear, setManufacturingYear] = useState("");
	const [engineNum, setEngineNum] = useState("");
	const [transmissionID, setTransmissionID] = useState("");
	const [engineTypeID, setEngineTypeID] = useState("");
	const [chassisID, setChassisID] = useState("");
	const [gpsID, setGpsID] = useState("");
	const [fuelSensorID, setFuelSensorID] = useState("");
	const [insuranceAmount, setInsuranceAmount] = useState("");
	const [insuranceExpDate, setInsuranceExpDate] = useState("");
	const [error, setError] = useState(false);
	const [plateNumError, setPlateNumError] = useState("");
	const [categoryID, setCategoryID] = useState("");
	const [notifResult, setNotifResult] = useState("");
	const [infoPop, setInfoPop] = useState(false);
	const currentUserID = currentUser.userID;
	const dt = new Date();

	function submitForm() {
		// console.log("1. Error is " + error + ", Data is " + data);
		if (
			plateNum.length == 0 ||
			vehicleTypeID.length == 0 ||
			brandID.length == 0 ||
			manufacturingYear.length == 0 ||
			engineNum.length == 0 ||
			transmissionID.length == 0 ||
			chassisID.length == 0 ||
			gpsID.length == 0 ||
			fuelSensorID.length == 0 ||
			insuranceAmount.length == 0 ||
			insuranceExpDate.length == 0 ||
			checkSpecial() == true ||
			checkYear() == true ||
			(manufacturingYear.length != 4 && manufacturingYear.length != 0) ||
			insuranceAmount < 0
		) {
			setError(true);
		} else {
			let vehicleData = {
				plateNum: plateNum,
				vehicleTypeID: vehicleTypeID,
				brandID: brandID,
				manufacturingYear: manufacturingYear,
				transmissionID: transmissionID,
				engineNum: engineNum,
				engineTypeID: engineTypeID,
				chassisID: chassisID,
				gpsID: gpsID,
				fuelSensorID: fuelSensorID,
				insuranceAmount: insuranceAmount,
				insuranceExpDate: insuranceExpDate,
				creatorID: currentUserID,
				creationDate: new Date(),
				disabled: isDisabled,
			};

			fetch("/api/vehicles/createVehicle", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(vehicleData),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data == "created") {
						console.log("SUCCESS");
						setNotifResult("Successfully created!");
						setError(false);
						window.location.reload();
					} else {
						setError(true);
						setPlateNumError(data);
						//   console.log("Duplicate Plate Num is" + plateNumError);
					}
				});

			//     console.log("2. Error is " + error + ", Data is " + data);
		}
	}
	function cancelForm() {
		setCancel(true);
	}
	function checkSpecial() {
		const specialChars = `/[!@#$%^&* ()_+\-=\[\]{};':"\\|,.<>\/?]+/;`;
		return specialChars.split("").some((char) => plateNum.includes(char)); // true if present and false if not
	}
	function showPlateNumError() {
		// console.log("Plate Number has special chars: " + checkSpecial());

		if (error) {
			//plateNum is Empty
			if (plateNum.length == 0) {
				return <span className="vehicle-create-error">Input Plate Number</span>;
			} else if (checkSpecial()) {
				return (
					<span className="vehicle-create-error">
						Must not contain spaces or special characters
					</span>
				);
			}
			//plateNum reached max char length
			else if (plateNum.length > 7 || plateNum.length < 5) {
				return (
					<span className="vehicle-create-error">
						Plate number must be 5 to 7 characters long
					</span>
				);
			}
		}
	}
	function checkYear() {
		return (
			parseInt(manufacturingYear) < 1900 ||
			parseInt(manufacturingYear) > dt.getFullYear()
		);
	}

	function showYearError() {
		if (error) {
			if (
				checkYear() ||
				(manufacturingYear.length != 4 && manufacturingYear.length != 0)
			) {
				return (
					<span className="vehicle-create-error">
						Enter valid Manufacturing Year
					</span>
				);
			}
		}
	}
	function showResult() {
		if (notifResult.length > 0) {
			return (
				<div className="top-notification-container">
					<span>{notifResult}</span>
				</div>
			);
		} else {
			return <></>;
		}
	}
	function ShowInsuranceError() {
		if (error) {
			if (insuranceAmount < 0) {
				return (
					<span className="vehicle-create-error">
						Input must not be negative
					</span>
				);
			}
		}
	}

	return (
		<>
			{" "}
			<Modal isOpen={vTypeOpen} className="modal" ariaHideApp={false}>
				<VCatTable
					trigger={vTypeOpen}
					setTrigger={setvTypeOpen}
					name={name}
					type={otype}
					id={categoryID}
				>
					{" "}
				</VCatTable>
			</Modal>
			<Modal isOpen={cancel} className="modal" ariaHideApp={false}>
				<Cancel
					trigger={cancel}
					setTrigger={setCancel}
					transaction={" Creation of Vehicle"}
				></Cancel>
			</Modal>
			<Modal isOpen={infoPop} className="modal" ariaHideApp={false}>
				<Info trigger={infoPop} setTrigger={setInfoPop}></Info>
			</Modal>
			{/* First Field Group */}
			<form>
				<div className="form-container">
					{showResult()}
					<div className="form-item">
						<label className="form-labels">
							Plate Number: <label className="required"> * </label>{" "}
						</label>{" "}
						<label className="label-format">
							{" "}
							Format: Exclude spaces and dashes.{" "}
						</label>{" "}
						<br />
						<input
							type="text"
							className="form-fields"
							placeholder="Enter Plate Number"
							onChange={(e) => setPlateNum(e.target.value)}
						/>
						{showPlateNumError()}
						{plateNumError == plateNum && plateNum.length > 0 ? (
							<span className="vehicle-create-error">
								Plate Number has already been registered
							</span>
						) : (
							<></>
						)}
					</div>
					<div className="form-item">
						<label className="form-labels">
							Vehicle Type: <label className="required"> * </label>{" "}
						</label>{" "}
						<button
							className="vehicle-icon-button vehicle-add-option-button "
							type="button"
							onClick={() => {
								setName("Vehicle Type");
								setOType(vtype);
								setvTypeOpen(true);
								setCategoryID("vehicleTypeID");
							}}
						>
							{" "}
							✎{" "}
						</button>
						<br />
						<select
							type="text"
							className="select-form"
							onChange={(e) => setVehicleTypeID(e.target.value)}
							required
						>
							<option value="" key="00003" defaultValue hidden>
								{" "}
								Select Vehicle Type{" "}
							</option>
							{vtype.map((vehicleType) => {
								if (vehicleType.disabled == false) {
									return (
										<option
											key={vehicleType.vehicleTypeID}
											value={vehicleType.vehicleTypeID}
										>
											{vehicleType.name}
										</option>
									);
								}
							})}
						</select>
						{error && vehicleTypeID.length == 0 ? (
							<span className="vehicle-create-error">Select Vehicle Type</span>
						) : (
							<></>
						)}
					</div>
					<div className="form-item form-toggle">
						{" "}
						Status:{" "}
						<button
							type="button"
							className="table-info-button"
							onClick={() => setInfoPop(!infoPop)}
						>
							i
						</button>
						<br />
						<ToggleSwitch
							disabled={isDisabled}
							setDisabled={setIsDisabled}
						></ToggleSwitch>
					</div>
				</div>

				{/* Second Field Group */}
				<br />
				<div className="form-container">
					<div className="form-item">
						<label className="form-labels">
							Brand: <label className="required"> * </label>{" "}
						</label>{" "}
						<button
							className="vehicle-icon-button vehicle-add-option-button "
							type="button"
							onClick={() => {
								setName("Vehicle Brand");
								setOType(brand);
								setvTypeOpen(true);
								setCategoryID("brandID");
							}}
						>
							{" "}
							✎{" "}
						</button>
						<br />
						<select
							className="select-form"
							onChange={(e) => setBrandID(e.target.value)}
							required
						>
							<option value="" key="00004" defaultValue hidden>
								{" "}
								Select Brand{" "}
							</option>
							{brand.map((brand) => {
								if (brand.disabled == false) {
									return (
										<option key={brand.brandID} value={brand.brandID}>
											{brand.name}
										</option>
									);
								}
							})}
						</select>
						{error && brandID.length == 0 ? (
							<span className="vehicle-create-error">Select Vehicle Brand</span>
						) : (
							<></>
						)}
					</div>

					<div className="form-item">
						<label className="form-labels">
							Manufacturing Year: <label className="required"> * </label>{" "}
						</label>{" "}
						<br />
						<input
							type="number"
							className="form-fields"
							placeholder="Enter Manufacturing Year"
							onChange={(e) => setManufacturingYear(e.target.value)}
						/>
						{showYearError()}
						{error && manufacturingYear.length == 0 ? (
							<span className="vehicle-create-error">
								Input Manufacturing Year
							</span>
						) : (
							<></>
						)}
					</div>

					<div className="form-item">
						<label className="form-labels">
							Transmission Type: <label className="required"> * </label>{" "}
						</label>{" "}
						<button
							className="vehicle-icon-button vehicle-add-option-button "
							type="button"
							onClick={() => {
								setName("Transmission Type");
								setOType(transmission);
								setvTypeOpen(true);
								setCategoryID("transmissionID");
							}}
						>
							{" "}
							✎{" "}
						</button>
						<br />
						<select
							className="select-form"
							onChange={(e) => setTransmissionID(e.target.value)}
							required
						>
							<option value="" key="00006" defaultValue hidden>
								{" "}
								Select Transmission{" "}
							</option>
							{transmission.map((transmission) => {
								if (transmission.disabled == false) {
									return (
										<option
											key={transmission.transmissionID}
											value={transmission.transmissionID}
										>
											{transmission.name}
										</option>
									);
								}
							})}
						</select>
						{error && transmissionID.length == 0 ? (
							<span className="vehicle-create-error">
								Select Transmission Type
							</span>
						) : (
							<></>
						)}
					</div>
				</div>

				<br />
				<hr />
				{/* Third Field Row */}

				<div className="form-container">
					<div className="form-item">
						<label className="form-labels">
							Engine Number: <label className="required"> * </label>{" "}
						</label>{" "}
						<br />
						<input
							type="text"
							className="form-fields"
							placeholder="Enter Engine Number"
							onChange={(e) => setEngineNum(e.target.value)}
						/>
						{error && engineNum.length == 0 ? (
							<span className="vehicle-create-error">Input Engine Number</span>
						) : (
							<></>
						)}
					</div>

					<div className="form-item">
						<label className="form-labels">
							Engine Type: <label className="required"> * </label>{" "}
						</label>{" "}
						<button
							className="vehicle-icon-button vehicle-add-option-button "
							type="button"
							onClick={() => {
								setName("Engine Type");
								setOType(engine);
								setvTypeOpen(true);
								setCategoryID("engineTypeID");
							}}
						>
							{" "}
							✎{" "}
						</button>
						<br />
						<select
							className="select-form"
							onChange={(e) => setEngineTypeID(e.target.value)}
							required
						>
							<option value="" key="00001" defaultValue hidden>
								{" "}
								Select Engine Type{" "}
							</option>
							{engine.map((engineType) => {
								if (engineType.disabled == false) {
									return (
										<option
											key={engineType.engineTypeID}
											value={engineType.engineTypeID}
										>
											{engineType.name}
										</option>
									);
								}
							})}
						</select>
						{error && engineTypeID.length == 0 ? (
							<span className="vehicle-create-error">Select Engine Type</span>
						) : (
							<></>
						)}
					</div>

					<div className="form-item">
						<label className="form-labels">
							Chassis: <label className="required"> * </label>{" "}
						</label>{" "}
						<br />
						<input
							type="text"
							className="form-fields"
							placeholder="Enter Chassis"
							onChange={(e) => setChassisID(e.target.value)}
						/>
						{error && chassisID.length == 0 ? (
							<span className="vehicle-create-error">Input Chassis</span>
						) : (
							<></>
						)}
					</div>
				</div>

				<br />

				<div className="form-container">
					<div className="form-item">
						<label className="form-labels">
							Insurance Amount: <label className="required"> * </label>{" "}
						</label>{" "}
						<label className="label-format"> Format: "0000.00" </label> <br />
						<input
							type="number"
							step=".01"
							className="form-fields"
							placeholder="Enter Insurance Amount"
							onChange={(e) => setInsuranceAmount(e.target.value)}
						/>
						{ShowInsuranceError()}
						{error && insuranceAmount.length == 0 ? (
							<span className="vehicle-create-error">
								Input Insurance Amount
							</span>
						) : (
							<></>
						)}
					</div>

					<div className="form-item">
						<label className="form-labels">
							Insurance Expiry Date: <label className="required"> * </label>{" "}
						</label>{" "}
						<br />
						<input
							type="date"
							className="form-fields"
							placeholder="Enter Insurance Expiry Date"
							onChange={(e) => setInsuranceExpDate(e.target.value)}
						/>
						{error && insuranceExpDate.length == 0 ? (
							<span className="vehicle-create-error">
								Input Insurance Expiry Date
							</span>
						) : (
							<></>
						)}
					</div>
				</div>
				<br />
				<hr />
				<div className="form-container">
					<div className="form-item">
						<label className="form-labels">
							GPS Provider Name: <label className="required"> * </label>{" "}
						</label>{" "}
						<button
							className="vehicle-icon-button vehicle-add-option-button "
							type="button"
							onClick={() => {
								setName("GPS Provider");
								setOType(gpsDATA);
								setvTypeOpen(true);
								setCategoryID("GPSProviderID");
							}}
						>
							{" "}
							✎{" "}
						</button>
						<br />
						<select
							className="select-form"
							onChange={(e) => setGpsID(e.target.value)}
							required
						>
							{" "}
							<option value="" key="00005" defaultValue hidden>
								{" "}
								Select GPS Provider{" "}
							</option>
							{gpsDATA.map((gpsProvider) => {
								if (gpsProvider.disabled == false) {
									return (
										<option
											key={gpsProvider.GPSProviderID}
											value={gpsProvider.GPSProviderID}
										>
											{gpsProvider.name}
										</option>
									);
								}
							})}
						</select>
						{error && gpsID.length == 0 ? (
							<span className="vehicle-create-error">
								Input GPS Provider Name
							</span>
						) : (
							<></>
						)}
					</div>

					<div className="form-item">
						<label className="form-labels">
							Fuel Level Sensor Name: <label className="required"> * </label>{" "}
						</label>{" "}
						<button
							className="vehicle-icon-button vehicle-add-option-button "
							type="button"
							onClick={() => {
								setName("Fuel Level Sensor");
								setOType(sensor);
								setvTypeOpen(true);
								setCategoryID("FuelSensorID");
							}}
						>
							{" "}
							✎{" "}
						</button>
						<br />
						<select
							className="select-form"
							onChange={(e) => setFuelSensorID(e.target.value)}
							required
						>
							{" "}
							<option value="" key="00002" defaultValue hidden>
								{" "}
								Select Fuel Level Sensor{" "}
							</option>
							{sensor.map((fuelSensor) => {
								if (fuelSensor.disabled == false) {
									return (
										<option
											key={fuelSensor.FuelSensorID}
											value={fuelSensor.FuelSensorID}
										>
											{fuelSensor.name}
										</option>
									);
								}
							})}
						</select>
						{error && fuelSensorID.length == 0 ? (
							<span className="vehicle-create-error">
								Select Fuel Sensor Name
							</span>
						) : (
							<></>
						)}
					</div>
					<br />
				</div>

				<br />

				<div className="form-container">
					<span className="required-text">
						Fields marked with <label className="required"> * </label> are
						required.
					</span>
					<span className="form-item-buttons">
						<BasicButton
							label={"Cancel"}
							color={"gray"}
							type={"reset"}
							clickFunction={cancelForm}
						></BasicButton>
						<BasicButton
							label={"Save"}
							color={"green"}
							type={"button"}
							clickFunction={submitForm}
						></BasicButton>
					</span>
				</div>
				<br />
			</form>
		</>
	);
}

export default VehicleCreate;
