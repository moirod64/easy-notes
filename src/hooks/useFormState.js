/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";

export default () => {
  const notesForm = {
    pocName: "",
    dateTime: "",
    transactionID: "",
    callReason: "",
    resolution: "",
    department: "",
    ticketNumber: "",
  };

  const [value, setValue] = useState(notesForm);

  const handleChange = (e) => {
    const { id } = e.target;
    const date = new Date().toString().slice(0, 24);
    // CLICK TO SET THE TIME, SET DEPARTMENT WHEN CHECKBOX IS USED OR JUST UPDATE GLOBAL STATE
    if (e.target.id === "dateTime") {
      setValue({ ...value, dateTime: date });
    } else if (id === "transferred") {
      setValue({ ...value, department: "Cancellations", callReason: "" });
    } else {
      setValue({ ...value, [id]: e.target.value });
    }
  };

  // RESET WHOLE FORM STATE
  const reset = () => {
    setValue(notesForm);
  };

  return [value, handleChange, reset];
};
