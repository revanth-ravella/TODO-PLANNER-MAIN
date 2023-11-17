import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./Todoplanner.css";
import { useParams } from "react-router-dom";

const Todoplanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { inputNumber } = useParams(); // Access inputNumber from URL parameters
  console.log(inputNumber);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userRef = doc(db, "Todo", inputNumber);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const tasksData = [];

          for (const key in userData) {
            if (Object.hasOwnProperty.call(userData, key)) {
              const taskText = userData[key];
              tasksData.push({
                text: taskText,
                addedDate: new Date().toLocaleString(),
                completed: false,
              });
            }
          }

          setTasks(tasksData);
        } else {
          console.log("User does not exist.");
          // Add your logic for handling a non-existing user
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Add your error handling logic
      }
    };

    fetchTasks();
  }, [inputNumber]);

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskItem = {
        text: newTask,
        addedDate: new Date().toLocaleString(),
        completed: false,
        adding: true,
      };

      setTasks((prevTasks) => [...prevTasks, newTaskItem]);
      setNewTask("");

      setTimeout(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task, index) =>
            index === prevTasks.length - 1 ? { ...task, adding: false } : task
          )
        );
      }, 300);

      addTaskToDatabase(newTaskItem);
    }
  };

  const addTaskToDatabase = async (newTaskItem) => {
    try {
      const userRef = doc(db, "Todo", inputNumber);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const nextTaskNumber = Object.keys(userData).length + 1;

        userData[nextTaskNumber] = newTaskItem.text;

        await setDoc(userRef, userData);
        console.log("New task added to the database");
      } else {
        console.log("User does not exist.");
      }
    } catch (error) {
      console.error("Error adding new task to the database:", error);
    }
  };

  const handleRemoveTask = async (index) => {
    const taskToRemove = tasks[index];
    setTasks((prevTasks) =>
      prevTasks
        .slice(0, index)
        .concat(
          { ...prevTasks[index], removing: true },
          prevTasks.slice(index + 1)
        )
    );

    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.removing));
    }, 300);

    await removeTaskFromDatabase(index + 1);
  };

  const removeTaskFromDatabase = async (taskKey) => {
    try {
      const userRef = doc(db, "Todo", inputNumber);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        delete userData[taskKey];

        await setDoc(userRef, userData);
        console.log("Task removed from the database");
      } else {
        console.log("User does not exist.");
      }
    } catch (error) {
      console.error("Error removing task from the database:", error);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "#fff" }}>
      <div className="task-list" style={{ backgroundColor: "#c8e6c9" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#4CAF50",
          }}
        >
          To-Do Planner
        </h1>
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={handleTaskChange}
            className="task-input-field"
          />
          <button onClick={handleAddTask} className="task-add-button">
            Add Task
          </button>
        </div>
        <ul className="task-items">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`${task.completed ? "completed" : ""} ${
                task.adding ? "adding-task" : ""
              } ${task.removing ? "removing-task" : ""}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #4CAF50",
                borderRadius: "5px",
              }}
            >
              <span>{task.text}</span>
              <div>
                <span
                  className="added-date"
                  style={{
                    fontSize: "13px",
                    color: "#777",
                    marginRight: "10px",
                  }}
                >
                  {task.addedDate}
                </span>
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="task-action-button"
                  style={{
                    backgroundColor: "#ff0000",
                    color: "#fff",
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todoplanner;
