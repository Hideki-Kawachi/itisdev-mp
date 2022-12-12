import BasicButton from "../../components/BasicButton";
import Link from "next/link";

function Info({trigger, setTrigger}) {
  function Close() {
    setTrigger(!trigger);
  }

  return (
    <>
      <div className="item-modal info-modal">
        <div className="item-header item-modal-header">
          <div className="item-column-container">
            <h1>INFORMATION</h1>
          </div>
          <button
            className="item-icon-button item-x-button"
            onClick={() => {
              setTrigger(false);
            }}
          >
            X
          </button>
        </div>
        <div className="item-column-container">
          <h1>Availability:</h1>
          <div>If enabled in the database</div>
        </div>
        <br />
        <div className="item-column-container">
          <h1>Record Legend: </h1>
          <div className="record-legend-container">
            {" "}
            <span className="record-legend-enabled"> Green </span> Active
          </div>
          <div className="record-legend-container">
            {" "}
            <span className="record-legend-disabled"> Red </span> Disabled
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
