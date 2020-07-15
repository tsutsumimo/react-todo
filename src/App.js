import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {

state = {
  todoList: JSON.parse(localStorage.getItem("todoList")) || []
}

addTodo = (item, callBack) => {
  this.setState(
    {
      todoList: this.state.todoList.concat(item)
    },
    () => {
      localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
      callBack && callBack()
    }
  )
}

  render() {
    return (
      <div className="App">
        <form
         className="App-form"
         onSubmit={e => {
           e.preventDefault();

           const titleElement = e.target.elements["title"]
           const descriptionElement = e.target.elements["description"];

           this.setState(
             {
               todoList: this.state.todoList.concat({
                 title: titleElement.value,
                 description: descriptionElement.value
               })
             },
             () => {
               titleElement.value = "";
               descriptionElement.value = "";
             }
           )
         }}
         >

           <div>
             <input
             id="title"
             placeholder="title"
             />
             <textarea
             id="description"
             placeholder="description"
             />
           </div>
        <div>
          <button
           type="submit"
          >
            登録
          </button>
        </div>
       </form>
       <div>
         {this.state.todoList.map(todo => (
          <ToDoListItem
            key={todo.title }
            title={todo.title}
            description={todo.description}
            onClick={() => {
              this.setState({
                todoList: this.state.todoList.filter(x => x !== todo)
              })
            }}
          />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
