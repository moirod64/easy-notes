import { useState } from "react";

export default function useToggleState() {
  // STATE TOGGLING TRUE OR FALSE STATE
  const [state, setState] = useState({
    transferred: false,
    ticket: false,
    copied: false,
  });

  const toggle = (e) => {
    const { id } = e.target;
    if (id === "copied") {
      setState({ ...state, copied: true });
      const timer = setTimeout(() => {
        setState({ ...state, copied: false });
      }, 1000);
      return () => clearTimeout(timer);
    } else if (id === "resetButton") {
      setState({ ...state, transferred: false, ticket: false });
    } else {
      setState({ ...state, [id]: !state[id] });
    }
  };

  return [state, toggle];
}
