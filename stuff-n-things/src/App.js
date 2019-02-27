import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
        newTodo: '',
        updatedTodo: '',
        Todos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contentEditable = React.createRef();
}
componentDidMount(){
    var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`;
  //Could be a a different API location in the future.
    fetch(`${API_URL}/api/todos`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    }).then((data)=> {              
        return data.json();
    }).then( json => {
        console.log(json)
        this.setState({
            Todos: json
        })
    })
    
}

handleChange = (e) => {
 this.setState({newTodo: e.target.value});
}



handleSubmit = (e) => {

  e.preventDefault();
  let name = this.state.newTodo
  var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`;
  
  console.log(`A new todo, ${name} is being added`)
  fetch(`${API_URL}/api/todos`, {
      method: 'post',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          name
      })
  })
  .then((response)=> {
      return response.json()
  })
  .then(()=> setTimeout(this.updateTodo(), 1000))
 
}

updateTodo = () => {
    var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`
  fetch(`${API_URL}/api/todos`).then((data)=> {
      return data.json();
  }).then( data => {
      this.setState({
          Todos: data
      })
  })
  .then(() => {
      this.setState({
      newTodo: ''
      })
  });
}

deleteTodo = (todo) => {
    var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`
  fetch(`${API_URL}/api/todos/${todo._id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type' : 'application/json'
    }
  },)
  .then(()=> setTimeout(this.updateTodo(), 1000))
}
  render() {
    let TodoList = this.state.Todos;
    TodoList = TodoList.map((todo, index)=> {
      return(
          <li key={index} >
              <span  className="name">{todo.name}</span> 
              <button onClick={()=>{this.deleteTodo(todo)}}>Delete</button>      
          </li>
      )
    })
    console.log(this.state)
    return (
      <>
      <div className="App">
        <h1 className="title">My Full-Stack Stuff and thing list</h1>
      </div>
      <div>
      <form onSubmit={this.handleSubmit} method="post">
          <label>Enter a thing</label>
          <input type="text"  value={this.state.newTodo} onChange={this.handleChange} />
          <input type="submit" value="Submit"/>
      </form>
      <ul>{this.state.Todos.length > 0 ? TodoList : <h1>LOADING TODOS!</h1>}</ul>
    </div>
    </>
    );
  }
}

export default App;
