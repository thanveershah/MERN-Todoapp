import React, { useState } from "react";

import axios from "axios";
import "./Popup.scss";

const Popup = props => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = () => {
    const todolist = {
      title,
      desc
    };
    setLoader(true);
    axios
      .post("/task", { todolist })
      .then(res => {
        props.displayTask();
        props.closePopup();
        setLoader(false);
      })
      .catch(err => console.log(err));
  };

  const closePopup = () => {
    props.closePopup();
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-container">
        <h2>Add New Task</h2>
        <button onClick={closePopup} id="close">
          X
        </button>
        <div className="input-container">
          <input
            type="text"
            name="task"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <textarea
            rows="4"
            name="desc"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="input-container btn-container">
          <button onClick={handleSubmit} id="add">
            {loader && <i className="fa fa-spinner fa-spin"></i>}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
