import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let idCounter = 0;

function getElementIndex(id, tasks) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].objectID === id) {
      return i;
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      taskToAdd: '',
      tasks: [],
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onTaskSubmit = this.onTaskSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  onSearchChange(event) {
    this.setState({taskToAdd : event.target.value});
  }

  onTaskSubmit(event) {
    event.preventDefault();
    let temporaryTaskArray = this.state.tasks;
    temporaryTaskArray.push({task: this.state.taskToAdd, objectID: idCounter});
    idCounter++;
    this.setState({tasks: temporaryTaskArray});
    this.refs.taskInput.value = '';
    console.log(idCounter - 1);
  }

  deleteTask(id, event) {
    console.log("Got to Delete Task: ", id);
    let index = getElementIndex(id, this.state.tasks);
    console.log("Index :", index);
    let tempDeleteTaskArray = this.state.tasks;
    tempDeleteTaskArray.splice(index, 1);
    this.setState({tasks : tempDeleteTaskArray});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React To Do List</h2>
        </div>
        <form onSubmit={this.onTaskSubmit}>
          <input type="text" onChange={this.onSearchChange} ref="taskInput"/><button>Add Task</button>
        </form>
        <ul>
        {this.state.tasks.map((task) =>
          <li key={task.objectID}>{task.task} <button onClick={this.deleteTask.bind(this, task.objectID)}>Delete Task</button></li>
        )}
        </ul>
      </div>

    );
  }
}

export default App;
