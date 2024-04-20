import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const App = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [uid, setUid] = useState();
  const [update, setUpdate] = useState();
  const [isChecked, setIsChecked] = useState(false);


  useEffect(() => {
    let todoString = localStorage.getItem("list");
    if (todoString) {
      let list = JSON.parse(localStorage.getItem("list"));
      setList(list);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("list", JSON.stringify(list));
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    saveToLS();
  };

  const handleAdd = () => {
    setList([...list, input]);
    setInput("");
    saveToLS();
  };

  const handleUpdate = () => {
    list.splice(uid, 1, input);
    setInput("");
    setUpdate(false);
    saveToLS();
  };

  const handleDelete = (i) => {
    const filterList = list.filter((elm) => elm !== list[i]);
    setList(filterList);
    saveToLS();
  };

  const handleEdit = (i) => {
    const filterList = list.filter((elm) => elm === list[i]);
    setInput(filterList[0]);
    setUid(i);
    setUpdate(true);
    saveToLS();
  };

  const handleCheckboxChange = (i) => {
     list.filter((elm) => elm === list[i]);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="todo-app">
        <h1>Todo App</h1>
        <div className="container">
          <div className="input-box">
            <input
              type="text"
              placeholder="Add Your To-Do"
              value={input}
              onChange={(e) => handleInput(e)}
            />
            {update ? (
              <button className="btn-update" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button
                className="btn-add"
                onClick={handleAdd}
                disabled={input.length <= 3}
              >
                Add
              </button>
            )}
          </div>
          <div className="todo-list">
            <ul>
              {list.map((item, i) => (
                <li key={i}>
                  <div className="todo-item">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span className={isChecked ? "completed" : ""}>{item}</span>
                  </div>
                  <div className="icons">
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEdit(i)}
                    />
                    <MdDeleteSweep
                      className="dlt-icon"
                      onClick={() => handleDelete(i)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
