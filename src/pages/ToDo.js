import React, { useEffect, useState } from "react";
import "./ToDo.css";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./Firebase";
// import { Link, Outlet } from "react-router-dom";

function ToDo() {
  const [todo, setTodo] = useState({
    task: "",
  });
  const [todoData, setTodoData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState({});

  const db = getFirestore(app);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "TODO"), {
      task: todo.task,
      // time: Timestamp,
    });
    console.log("Document written with ID: ", docRef.id);
    getData();
    setTodo({
      task: "",
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const db = getFirestore(app);
    const docRef = collection(db, "TODO");
    const document = await getDocs(docRef);
    const data = document.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    setTodoData(data);
  };

  const deleteData = (id) => {
    deleteDoc(doc(db, "TODO", id));
    getData();
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateTask({
      ...updateTask,
      task: value,
    });
  };

  const updateData = async () => {
    const todoDocRef = doc(db, "TODO", updateTask.id);
    await updateDoc(todoDocRef, {
      task: updateTask.task,
    });
    setEdit(false);
    getData();
  };

  return (
    <div className="todo">
      <div className="dashbord-div">
        <div className="add-todo-div">
          <input
            type="text"
            className="text-input"
            placeholder="What do you need to do today?"
            name="task"
            value={todo.task}
            onChange={handleChange}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Add
          </button>
          {edit ? (
            <div>
              <input
                type="text"
                className="text-input"
                placeholder="What do you need to do update?"
                value={updateTask.updatetask}
                name="updatetask"
                onChange={handleUpdate}
              />{" "}
              <button
                className="crud-button"
                onClick={() => {
                  updateData();
                }}
              >
                Update
              </button>{" "}
            </div>
          ) : null}
        </div>

        <div>
          <table className="todo-table">
            <thead>
              <tr className="thTittle">
                <td>Task</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {todoData.map((item, index) => (
                <tr key={index}>
                  <td>{item.task}</td>
                  {/* <td>hello</td> */}
                  <td>
                    <button
                      className="crud-button"
                      onClick={() => {
                        setEdit(true);
                        setUpdateTask(item);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="crud-button"
                      onClick={() => {
                        console.log(item.id);
                        deleteData(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToDo;