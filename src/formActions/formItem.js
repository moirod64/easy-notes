import data from "../data.json";

const FormItem = ({ value, handleChange, reset, state, toggle }) => {
  // Reset Values from State and Turns off Checkboxes
  const handleReset = (e) => {
    reset();
    toggle(e);
  };

  return (
    <div className="flex w-full h-auto basis-1/2 md:justify-center items-center md:my-0 sm:my-4 my-4">
      <div className="flex flex-col justify-center container mx-10 my-8 p-4 bg-neutral-700 rounded-lg shadow-lg">
        {/* FORM */}
        <form className="my-6" onChange={handleChange}>
          <label className="text-xl text-white font-bold" htmlFor="pocName">
            POC or Caller Name
          </label>
          <input
            value={value.pocName}
            className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400"
            type="text"
            id="pocName"
          />

          <label className="text-xl text-white font-bold" htmlFor="dateTime">
            Date and Time
          </label>
          <input
            onClick={handleChange}
            value={value.dateTime}
            className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400"
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
            value={value.transactionID}
            className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400"
            type="text"
            id="transactionID"
          />

          <label
            className="text-xl text-white font-bold"
            htmlFor={state.transferred ? "resolution" : "callReason"}
          >
            Reason for {state.transferred ? "Transfer" : "Contact"}
          </label>
          <textarea
            value={state.transferred ? value.resolution : value.callReason}
            className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400"
            id={state.transferred ? "resolution" : "callReason"}
            rows="4"
            cols="50"
          />

          <label className="text-xl text-white font-bold" htmlFor="resolution">
            {state.transferred ? "Department" : "Resolution"}
          </label>
          {/* CONDITIONAL TO SHOW IF IT'S BEING TRANSFERRED */}
          {state.transferred ? (
            <select
              id="department"
              name="department"
              className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400 mb-20"
            >
              {/* MAPPING SELEC BOX */}
              {data.phoneNumberNames.map((i, arr) => (
                <option key={arr} value={i}>
                  {i}
                </option>
              ))}
            </select>
          ) : (
            <textarea
              value={state.transferred ? "" : value.resolution}
              className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400"
              id={state.transferred ? "callReason" : "resolution"}
              rows="4"
              cols="50"
            ></textarea>
          )}
          {/* CONDITIONAL IF A TICKET WAS CREATED FOR THE CONTACT */}
          {state.ticket ? (
            <>
              <label
                className="text-xl text-white font-bold"
                htmlFor="ticketNumber"
              >
                Ticket ID
              </label>
              <input
                value={value.ticketNumber}
                className="block text-base w-full p-2 my-2 text-black border rounded-lg sm:text-md bg-gray-400"
                type="text"
                id="ticketNumber"
              />
            </>
          ) : (
            ""
          )}

          {/* BUTTONS AND CHECKBOXES */}
          <div className="flex md:flex-col xl:flex-row items-center justify-between">
            <button
              onClick={handleReset}
              id="resetButton"
              type="button"
              className="text-black bg-indigo-400 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-800 font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
            >
              Reset All
            </button>
            <div className="flex sm:flex-row items-center">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                id="transferred"
                type="checkbox"
                onChange={toggle}
                checked={state.transferred}
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
                onChange={toggle}
                checked={state.ticket}
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
  );
};

export default FormItem;
