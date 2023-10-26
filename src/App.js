import "./App.css";
import NavBar from "./NavBar";
import FormItem from "./formActions/formItem";
import FormView from "./formActions/formView";
import { ContextProvider } from "./context/useNotesContext";
import useFormState from "./hooks/useFormState";
import useToggleState from "./hooks/useToggle";
import NotesList from "./formActions/formNotesList";

function App() {
  const [value, handleChange, reset] = useFormState();

  const [state, toggle] = useToggleState();

  return (
    <div className="flex flex-col h-screen bg-neutral-800">
      <header className="">
        <NavBar state={state} toggle={toggle} />
      </header>
      <ContextProvider>
        <div className="flex flex-col flex-col md:flex-row md:flex-wrap h-screen md:justify-center sm:items-end items-center overflow-auto">
          {/* Displaying Form */}
          <FormItem
            value={value}
            handleChange={handleChange}
            reset={reset}
            state={state}
            toggle={toggle}
          />
          {/* Displaying Information */}
          <FormView value={value} state={state} toggle={toggle} />
          {/* NOTES LIST */}
          <NotesList />
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
