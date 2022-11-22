import {useState} from "react";
import Link from "next/link";

function tab() {
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
          <Link href="inventory/addinventory">Add Record </Link>
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Pull-out Inventory
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Add inventory here. </h2>
          <hr />
          <p>
            *Sample add inventory*
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2> Pull-out Inventory </h2>
          <hr />
          <p>
            *Sample pull-out inventory here*
          </p>
        </div>
      </div>
    </div>
  );
}
export default tab;
