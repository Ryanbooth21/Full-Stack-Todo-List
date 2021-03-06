import React, { Component } from 'react';

class Todo extends Component {
    constructor(){
      super()
      this.state = {
          newTodo: '',
          Todos: [],
          todoToEdit: [],
          beingEdited: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    //   this.handleEdit = this.handleEdit.bind(this)
  }
   todoBeingEdited = (id) => {
      this.setState({
          beingEdited: id,
      })
    }
  
  
  handleEditDone = () => {
    this.setState({
        beingEdited: null
      })
      this.editTodoList(this.state.todoToEdit[0], this.state.todoToEdit[1])
  }
  
  handleEditChange = e => {
      let todos = [...this.state.Todos];
      todos[e.target.name].name = e.target.value
      this.setState({Todos: todos})
      this.setState({todoToEdit: [todos[e.target.name]._id, todos[e.target.name]]  })
  }
  
  editTodoList = (id, data) => {
      var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`;
      fetch(`${API_URL}/api/todos/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type' : 'application/json'
            }
      }).then(res=> {
          console.log(res.json() + 'UPDATE!!')
      })
  }
  componentDidMount(){
      var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`;
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
    .then(()=> this.updateTodo());  
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
    })
    
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
    .then(()=> this.updateTodo())
  }


    render() {
      let TodoList = this.state.Todos;
      TodoList = TodoList.map((todo, index)=> {
        return(
            <li key={index}  >
                {this.state.beingEdited === todo._id ? null : <> <span  value={todo.name} name={todo.name}><label onClick={()=>this.todoBeingEdited(todo._id)}>{todo.name}</label></span><button className="button delete" onClick={()=>{this.deleteTodo(todo)}}>Delete</button></> }     
                { this.state.beingEdited === todo._id ? <><input type="text" name={index} id={todo.id} onChange={this.handleEditChange}/><button className="button" onClick={()=>{this.handleEditDone()}}>Submit</button> </>: null }
            </li>
        )
      })
      
      return (
        <>
        <div className="App">
          <h1 className="title">Hello world!<br/> My Todo list</h1>
        </div>
        <div id="todoContainer">
        <form id="enterThing" onSubmit={this.handleSubmit} method="post">
            <label>Enter a thing</label><br/>
            <input type="text"  value={this.state.newTodo} onChange={this.handleChange} />
            <button className="button" type="submit" value="Submit">Submit</button>
        </form>
        <ul>{this.state.Todos.length > 0 ? TodoList : <h1>LOADING TODOS!</h1>}</ul>
      </div>
      </>
      );
    }
  }
  
  export default Todo;