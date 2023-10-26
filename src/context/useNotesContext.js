import { createContext } from "react";
import reducer from "../reducers/useNotesReducer";
import useLocalStorage from "../reducers/useLocalStorageReducer";

export const NotesContext = createContext();
export const DispatchContext = createContext();

const notes = [
  {
    id: 1,
    note: {
      pocName: "",
      dateTime: "",
      transactionID: "",
      callReason: "",
      department: "",
      resolution: "",
      ticketNumber: "",
    },
  },
];

export const ContextProvider = (props) => {
  const [notesList, dispatch] = useLocalStorage("notes", notes, reducer);

  return (
    <NotesContext.Provider value={notesList}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </NotesContext.Provider>
  );
};
