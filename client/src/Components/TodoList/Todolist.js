import React, { useEffect, useState } from "react";
import "./Todolist.scss";
import Popup from "./Popup";
import axios from "axios";
import Dropdown from "./Dropdown";

const Todolist = () => {
  const [popup, setPopup] = useState(false);
  const [task, newTask] = useState([]);

  const closePopup = () => {
    setPopup(false);
  };

  function displayTask() {
    axios
      .get("/task")
      .then(res => {
        newTask(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    displayTask();
  }, []);

  return (
    <div className="todolist-wrapper">
      <h1>Todo App</h1>
      <div className="btn-container">
        <button onClick={() => setPopup(true)} id="add-task">
          Add Todo +
        </button>
      </div>
      {popup && <Popup closePopup={closePopup} displayTask={displayTask} />}

      <div className="resp-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.length !== 0 ? (
              task.map((data, key) => (
                <tr key={key}>
                  <td className="content">{data.todolist.title}</td>
                  <td className="content">{data.todolist.desc}</td>
                  <td
                    className="content status"
                    style={{
                      color:
                        data.todolist.state === 1
                          ? "#616161"
                          : data.todolist.state === 2
                          ? "#00ed3f"
                          : data.todolist.state === 3
                          ? "#ff8201"
                          : data.todolist.state === 4
                          ? "#ff2159"
                          : "#616161"
                    }}
                  >
                    {data.todolist.state === 1
                      ? "Created"
                      : data.todolist.state === 2
                      ? "Finished"
                      : data.todolist.state === 3
                      ? "Working"
                      : data.todolist.state === 4
                      ? "Cancel Task"
                      : "Created"}
                  </td>
                  <td>
                    <Dropdown taskId={data._id} displayTask={displayTask} />
                  </td>
                </tr>
              ))
            ) : (
              <td>NO TASKS FOUND</td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todolist;
