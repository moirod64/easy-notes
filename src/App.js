import "./App.css";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const notesForm = {
    pocName: "",
    dateTime: "",
    transactionID: "",
    callReason: "",
    department: "",
    resolution: "",
  };

  const phoneNumbersList = [
    "8443397494",
    "8449984798",
    "2008109",
    "8449984798",
    "8884798729",
    "2008101",
    "2009965",
    "2003075",
    "4234276001",
    "8446546169",
  ];
  const phoneNumberNames = [
    "Cancelations",
    "Client Care",
    "Marketing Support",
    "Web Mods",
    "Thryv Pay",
    "URL Management",
    "Social Support",
    "GMB Expert",
    "Bristol Team",
    "Vivial Support",
  ];

  const [transferred, setTransferred] = useState(false);

  const [ticket, setTicket] = useState(false);

  const [CopyNotice, setCopyNotice] = useState(false);

  const [POC, setPOC] = useState(notesForm);

  const [formInfo, setFormInfo] = useState(null);

  const [dropdown, setDropdown] = useState({
    phoneNumbers: false,
    importantLinks: false,
  });

  const dropdownChange = (n) => {
    const { id } = n.target;
    setDropdown({ dropdown: false, [id]: !dropdown[id] });
    // clicking out
    if (!dropdown.phoneNumbers || !dropdown.importantLinks) {
      document.body.addEventListener("click", dropdownChange);
    }
  };

  const handleChange = (n) => {
    const { id, value } = n.target;
    setCopyNotice({ copied: false });
    setPOC({ ...POC, [id]: value });
  };

  const setDate = () => {
    const date = new Date().toString().slice(0, 24);
    setPOC({ ...POC, dateTime: date });
  };

  const onTransferChecked = () => {
    setTransferred(!transferred);
    if (!transferred) setPOC({ ...POC, department: "Cancelations" });
  };

  const onTicketChecked = () => {
    setTicket(!ticket);
    if (!ticket) setPOC({ ...POC, ticketNumber: "" });
  };

  const clearForm = (n) => {
    n.preventDefault();
    setPOC({
      pocName: "",
      dateTime: "",
      transactionID: "",
      callReason: "",
      department: "",
      resolution: "",
      ticketNumber: "",
    });
    setTransferred(false);
    setTicket(false);
  };

  useEffect(() => {
    if (POC.department === "") setPOC({ ...POC, department: "Cancelations" });
    setFormInfo(document.getElementById("completedNotes").innerText);
  }, [POC, transferred]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyNotice({ copied: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [CopyNotice.copied]);

  let popup = null;

  if (CopyNotice.copied) {
    popup = (
      <span className="bottom-5 left-1/3 right-1/3 absolute z-100 bg-green-100 text-green-800 text-sm text-center font-medium mr-2 px-2.5 py-0.5 rounded bg-green-300">
        Copied to Clipboard!
      </span>
    );
  }
  console.log(POC.dateTime);
  return (
    <div className="flex flex-col h-screen bg-slate-800">
      <header className="">
        <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
            <h2 className="pl-3 pr-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Easy Notes
            </h2>
            <div className="w-full md:block md:w-auto" id="navbar-dropdown">
              <ul className="flex font-medium md:p-0 flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-900 ">
                <li>
                  <button
                    onClick={dropdownChange}
                    id="phoneNumbers"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    Phone numbers
                  </button>
                  <div
                    id="dropdownNavbar"
                    className={`z-10 w-fit font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute ${
                      dropdown.phoneNumbers ? "" : "hidden"
                    }`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      {phoneNumbersList.map((i, arr) => (
                        <li key={arr}>
                          <CopyToClipboard
                            key={i}
                            className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            text={i}
                            onCopy={() => {
                              setCopyNotice({ copied: true });
                            }}
                          >
                            <button key={arr + 1} className="">
                              {phoneNumberNames[arr]}
                            </button>
                          </CopyToClipboard>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li>
                  <button
                    onClick={dropdownChange}
                    id="importantLinks"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    Important Links
                  </button>
                  <div
                    id="dropdownNavbar"
                    className={`z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute ${
                      dropdown.importantLinks ? "" : "hidden"
                    }`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <a
                          HREF="https://payroll123.net/pro/portal/VIVDO/"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Payroll Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          HREF="https://dexmedia.okta.com/app/UserHome"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          OKTA | Live Version
                        </a>
                      </li>
                      <li>
                        <a
                          HREF="https://command.thryv.com/"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Command Center
                        </a>
                      </li>
                      <li>
                        <a
                          HREF="https://emp.thryv.com/app"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          Business Center
                        </a>
                      </li>
                      <li>
                        <a
                          HREF="https://learn.thryv.com/hc/en-us"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          Learn | Thryv
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {popup}
      <div className="flex flex-col sm:flex-col md:flex-row h-screen items-center overflow-auto py-6 md:py-6 sm:py-6">
        <div className="flex w-full h-auto md:justify-center items-center">
          <div className="flex flex-col justify-center container mx-16 p-4 bg-slate-700 rounded-lg shadow-lg">
            <form className="my-6" onChange={handleChange}>
              <label className="text-xl text-white font-bold" htmlFor="pocName">
                POC or Caller Name
              </label>
              <input
                value={POC.pocName}
                className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400"
                type="text"
                id="pocName"
              />

              <label
                className="text-xl text-white font-bold"
                htmlFor="dateTime"
              >
                Date and Time
              </label>
              <input
                onClick={setDate}
                value={POC.dateTime}
                className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400"
                type="text"
                id="dateTime"
              />

              <label
                className="text-xl text-white font-bold"
                htmlFor="transactionID"
              >
                Transaction ID
              </label>
              <input
                value={POC.transactionID}
                className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400"
                type="text"
                id="transactionID"
              />

              <label
                className="text-xl text-white font-bold"
                htmlFor="callReason"
              >
                Reason for the {transferred ? "Transfer" : "Call"}
              </label>
              <textarea
                value={POC.callReason}
                className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400"
                id="callReason"
                rows="4"
                cols="50"
              />

              <label
                className="text-xl text-white font-bold"
                htmlFor="resolution"
              >
                {transferred ? "Department" : "Resolution"}
              </label>
              {transferred ? (
                <select
                  id="department"
                  name="department"
                  className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400 mb-20"
                >
                  {phoneNumberNames.map((i, arr) => (
                    <option key={arr} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  value={POC.resolution}
                  className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400"
                  id="resolution"
                  rows="4"
                  cols="50"
                ></textarea>
              )}
              {ticket ? (
                <label
                  className="text-xl text-white font-bold"
                  htmlFor="ticketNumber"
                >
                  Ticket ID
                </label>
              ) : (
                ""
              )}
              {ticket ? (
                <input
                  value={POC.ticketNumber}
                  className="block text-base w-full p-4 my-2 text-black border rounded-lg bg-gray-50 sm:text-md bg-gray-400"
                  type="text"
                  id="ticketNumber"
                />
              ) : (
                ""
              )}
              <div className="flex md:flex-col xl:flex-row items-center justify-between">
                <button
                  onClick={clearForm}
                  type="submit"
                  className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Reset All
                </button>
                <div className="flex sm:flex-row items-center">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    id="transferred"
                    type="checkbox"
                    onChange={onTransferChecked}
                    checked={transferred}
                  />
                  <label
                    className="text-base text-white font-semibold mx-2"
                    htmlFor="transferred"
                  >
                    Was this call transferred?
                  </label>
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    id="ticket"
                    type="checkbox"
                    onChange={onTicketChecked}
                    checked={ticket}
                  />
                  <label
                    className="text-base text-white font-semibold mx-2"
                    htmlFor="ticket"
                  >
                    Was a ticket created?
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Displaying Form */}
        <div className="flex w-full h-auto justify-center items-center py-6 md:py-6 sm:py-6">
          <div className="flex flex-col justify-center container mx-16 p-4 bg-slate-700 rounded-lg shadow-lg">
            <div id="completedNotes">
              <div className="w-full my-2 p-6 break-all bg-gray-300  rounded-lg">
                Point of Contact: {POC.pocName}
              </div>
              <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
                Date & Time: {POC.dateTime}
              </div>
              <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
                Transaction ID: {POC.transactionID}
              </div>
              {transferred ? (
                ""
              ) : (
                <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
                  Reason: {POC.callReason}
                </div>
              )}
              {transferred ? (
                <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
                  Resolution & Transfer Reason: Had client transferred over to
                  our {POC.department} department. Reason being, the client
                  needed more assistance with {POC.callReason}
                </div>
              ) : (
                <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
                  Resolution: {POC.resolution}
                </div>
              )}
              {ticket ? (
                <div className="w-full my-1 p-6 break-all bg-gray-300 rounded-lg">
                  Ticket ID: {POC.ticketNumber}
                </div>
              ) : (
                ""
              )}
            </div>
            <CopyToClipboard
              text={formInfo}
              onCopy={() => {
                setCopyNotice({ copied: true });
              }}
            >
              <button className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Copy All
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
