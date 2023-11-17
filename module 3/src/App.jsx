import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    };
  }

  handleTaskChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  handleAddTask = () => {
    const { newTask, tasks } = this.state;
    if (newTask.trim() !== '') {
      const newTaskItem = {
        text: newTask,
        addedDate: new Date().toLocaleString(),
        completed: false,
        adding: true, // Add a flag for animation
      };
      this.setState({
        tasks: [...tasks, newTaskItem],
        newTask: '',
      });
  
      // Set a timeout to remove the 'adding' flag for the fade-in animation
      setTimeout(() => {
        const updatedTasks = [...this.state.tasks];
        updatedTasks[updatedTasks.length - 1].adding = false;
        this.setState({ tasks: updatedTasks });
      }, 300);
    }
  };
  
  handleRemoveTask = (index) => {
    const tasks = [...this.state.tasks];
    const removedTask = tasks.splice(index, 1)[0];
    removedTask.removing = true; // Add a flag for animation
    this.setState({ tasks });
  
    // Set a timeout to actually remove the task from the state
    setTimeout(() => {
      this.setState({ tasks: tasks.filter((task) => !task.removing) });
    }, 300);
  };

  handleCompleteTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  render() {
    return (
      <div className="App">
        <div className="task-list">
          <h1>To-Do Planner</h1>
          <div className="task-input">
            <input
              type="text"
              placeholder="Add a new task..."
              value={this.state.newTask}
              onChange={this.handleTaskChange}
            />
            <button onClick={this.handleAddTask}>Add Task</button>
          </div>
          <ul className="task-items">
            {this.state.tasks.map((task, index) => (
              <li
              key={index}
              className={`${
                task.completed ? 'completed' : ''
              } ${task.adding ? 'adding-task' : ''} ${
                task.removing ? 'removing-task' : ''
              }`}
              >
                <span>{task.text}</span>
                <div>
                  <span className="added-date">{task.addedDate}</span>
                  <button onClick={() => this.handleCompleteTask(index)}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => this.handleRemoveTask(index)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
