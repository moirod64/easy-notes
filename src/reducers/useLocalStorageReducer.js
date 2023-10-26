/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from "react";

const useLocalStorage = (key, defaultValue, reducer) => {
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    let value;
    // PARSE FROM LOCAL STORAGE
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultValue),
      );
    } catch (e) {
      value = defaultValue;
    }
    // RETURN DATA PARSED
    return value;
  });

  // Sets Item from Local Storage into List
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};

export default useLocalStorage;
