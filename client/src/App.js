import React, { Component } from 'react';
import Todo from './Todo';
import UserLogin from './userLogin'
import UserLogOut from './userLogout'
import './styles.scss'

class App extends Component {
  constructor(){
    super()
    this.state = {
        loggedIn: false
    }
}
    logIn = () => {
        this.setState({
            loggedIn: true
        })
    }
    logOut = (e) => {
        this.setState({
            loggedIn: false
        })
    }
  render() {
    return (
    <div id="mainContainer">  
        {this.state.loggedIn === true ? <><Todo/><UserLogOut logOut={this.logOut}/></> : <UserLogin logIn={this.logIn}/> }
    </div>
    );
  }
}

export default App;
