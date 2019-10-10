import React, { useState } from "react";
import "./Dropdown.scss";
import axios from "axios";
import PropTypes from "prop-types";

function Dropdown(props) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [status, setStatus] = useState([
    {
      id: 2,
      status: "Finished"
    },
    {
      id: 3,
      status: "Working"
    },
    {
      id: 4,
      status: "Cancel Task"
    },
    {
      id: 5,
      status: "Delete"
    }
  ]);
  const showDropdown = e => {
    e.preventDefault();
    setDisplayMenu(!displayMenu);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const taskId = props.taskId;
    if (id === 5) {
      axios
        .delete(`/task/delete/${taskId}`)
        .then(res => {})
        .catch(err => console.log(err));
      props.displayTask();
    } else {
      axios
        .put(`/task/update/${taskId}/${id}`)
        .then(res => {})
        .catch(err => console.log(err));
      props.displayTask();
    }
  };

  return (
    <div className="dropdown" style={{ width: "200px" }}>
      <div className="button" onClick={showDropdown}>
        Actions
      </div>

      {displayMenu ? (
        <ul>
          {status.map((data, key) => (
            <li onClick={e => handleSubmit(e, data.id)} key={data.id}>
              <a href="#" role="button">
                {data.status}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

Dropdown.propTypes = {
  displayTask: PropTypes.func,
  taskId: PropTypes.string
};

export default Dropdown;
