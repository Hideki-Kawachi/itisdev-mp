import React, { useNavigate } from "react";
import BasicButton from "../../components/BasicButton";
import Link from "next/link";



function Cancel({ trigger, setTrigger, transaction }) {


    function Close() {
      setTrigger(!trigger);
    }



    
  return (
    <>
      <div className="item-modal">
        <div className="item-header item-modal-header item-modal-header-center">
          <div className="item-column-container">
            <h1 className="cancel-header">Cancel{transaction}?</h1>
            <h2 className="cancel-header">
              {" "}
              All unsubmitted data will be lost.
            </h2>
            <br />
          </div>
        </div>

        <div className="pop-up-buttons">
          <BasicButton
            label={"No"}
            color={"green"}
            type={"reset"}
            clickFunction={Close}
          ></BasicButton>

          <Link href="/vehicles">
            <a>
              <BasicButton
                label={"Yes"}
                color={"red"}
                type={"button"}
              ></BasicButton>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cancel;
