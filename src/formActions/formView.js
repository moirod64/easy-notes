import { useState, useEffect, useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { DispatchContext } from "../context/useNotesContext";

const FormView = ({ value, state, toggle }) => {
  // SETS FORM INFO FOR COPY ONCE UPDATED
  const [formInfo, setFormInfo] = useState(null);

  const dispatch = useContext(DispatchContext);

  // COPY AND SAVE
  const handleCopy = (e) => {
    if (value.pocName === "" || value.transactionID === "") {
      alert("Empty Form!");
    } else {
      dispatch({ type: "CREATE", notes: value });
      toggle(e);
    }
  };

  // UPDATE INNER TEXT IN LOCAL FOR COPY WHEN THERE'S AN UPDATE IN GLOBAL
  useEffect(() => {
    setFormInfo(document.getElementById("completedNotes").innerText);
  }, [value]);

  let popup = null;

  // NOTIFICATION OF COPY
  if (state.copied) {
    popup = (
      <span className="bottom-5 left-1/3 right-1/3 absolute z-100 bg-green-100 text-green-800 text-sm text-center font-medium mr-2 px-2.5 py-0.5 rounded bg-green-300">
        Copied to Clipboard!
      </span>
    );
  }

  return (
    <div className="flex w-full h-auto justify-center items-center basis-1/2 md:my-0 sm:my-4 my-4">
      <div className="flex flex-col justify-center container mx-10 p-4 bg-neutral-700 rounded-lg shadow-lg">
        <div id="completedNotes">
          <div className="w-full my-2 p-6 break-all bg-gray-300  rounded-lg">
            Point of Contact: {value.pocName}
          </div>
          <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
            Date & Time: {value.dateTime}
          </div>
          <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
            Transaction ID: {value.transactionID}
          </div>
          {/* CONDITIONAL TO SHOW IF IT'S BEING TRANSFERRED TEXT ONLY */}
          {state.transferred ? (
            ""
          ) : (
            <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
              Reason: {value.callReason}
            </div>
          )}
          {/* CONDITIONAL TO SHOW IF IT'S BEING TRANSFERRED */}
          {state.transferred ? (
            <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
              Resolution & Transfer Reason: Had client transferred over to our{" "}
              {value.department} department. Reason being, the client needed
              more assistance with {value.resolution}
            </div>
          ) : (
            <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
              Resolution: {value.resolution}
            </div>
          )}
          {state.ticket ? (
            <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
              Ticket ID: {value.ticketNumber}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* COPY TO CLIPBOARD ACTION */}
        <CopyToClipboard text={formInfo} id="copied">
          <button
            onClick={handleCopy}
            className="text-black bg-indigo-400 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-800 font-semibold rounded-lg text-md px-5 py-2.5 m-4 focus:outline-none "
          >
            Copy & Save
          </button>
        </CopyToClipboard>
        {popup}
      </div>
    </div>
  );
};

export default FormView;
