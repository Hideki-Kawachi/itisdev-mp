import { useState } from "react";
import Link from "next/link";
import Header from "../Header";
import NavBar from "../NavBar";
import Dropdown from "../Dropdown";
import ToggleSwitch from "../ToggleSwitch";
import BasicButton from "../BasicButton";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";

function AuditTabs(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [toggleState, setToggleState] = useState(props.tab);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <Link href="/audit">
          <button
            className={toggleState == 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Transaction
          </button>
        </Link>
        <Link href="/audit/inventoryRep">
          <button
            className={toggleState == 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            {" "}
            Inventory
          </button>
        </Link>
        <Link href="/audit/vecRep">
          <button
            className={toggleState == 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Vehicles
          </button>
        </Link>
        <Link href="/audit/suppliesRep">
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
export default AuditTabs;
