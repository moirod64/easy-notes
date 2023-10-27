import { useContext } from "react";
import { DispatchContext, NotesContext } from "../context/useNotesContext";
import { CSVLink } from "react-csv";

const NotesList = () => {
  // CONTEXT LIST PASSED DOWN FROM NOTESCONTEXT
  const notesContext = useContext(NotesContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className="md:flex w-3/4 mb-0 mt-16 h-60 overflow-x-auto shadow-md rounded-lg hidden">
      <table className="w-full text-sm text-left text-neutral-800 overflow-x-auto ">
        <thead className="text-xs text-white font-bold uppercase bg-indigo-600">
          <tr>
            <th scope="col" className="px-6 py-3">
              POC
            </th>
            <th scope="col" className="px-6 py-3">
              Date and Time
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Reason of Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Resolution
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket
            </th>
            <th scope="col" className="px-6 py-3">
              Delete Note
            </th>
          </tr>
        </thead>
        <tbody>
          {notesContext.map((notes) =>
            notes.note.pocName === "" ? (
              ""
            ) : (
              <tr key={notes.id} className="bg-indigo-300">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap"
                >
                  {notes.note.pocName}
                </th>
                <td className="px-4 py-2 break-normal">
                  {notes.note.dateTime}
                </td>
                <td className="px-4 py-2 break-normal">
                  {notes.note.transactionID}
                </td>
                <td className="px-4 py-2 break-normal">
                  {notes.note.callReason}
                </td>
                <td className="px-4 py-2 break-normal">
                  {notes.note.resolution}
                </td>
                <td className="px-4 py-2 break-normal">
                  {notes.note.ticketNumber}
                </td>
                <td className="px-4 py-2 break-normal">
                  <button
                    onClick={() => dispatch({ type: "REMOVE", id: notes.id })}
                    id="deleteButton"
                    type="button"
                    className="text-black font-bold bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-800 rounded-lg text-sm px-3 py-1.5 focus:outline-none break-normal"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <CSVLink
        data={notesContext.map((notes) => notes.note)}
        filename={`Exported-Notes+${new Date().toString().slice(0, 16)}.csv`}
      >
        <button className="absolute right-2 bottom-2 z-10 text-black bg-indigo-400 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-800 font-semibold rounded-lg text-md px-5 py-2.5 m-4 focus:outline-none">
          Download
        </button>
      </CSVLink>
    </div>
  );
};

export default NotesList;
