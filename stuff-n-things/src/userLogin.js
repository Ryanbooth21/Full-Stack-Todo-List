import React from 'react'

class userLogin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userName: '',
            passWord: '',
        }
    }

    handleUserChange = (e) => {
        this.setState({
            userName: e.target.value,
        })
    }

    handlePassChange = (e) => {
        this.setState({
            passWord: e.target.value
        })
    }
    handleSubmit = (e) => {
        
        let username = this.state.userName
        let password = this.state.passWord
        var API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4000`;
        
        fetch(`${API_URL}/api/users`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then((response)=> {
            return response.json()
        })
        .then((json)=>{
            console.log(json)
        })
        .then(()=>this.props.logIn())
      }
    

    render(){
        return (
            <div id="LoginContainer">
            <h1>Login</h1>
                <div >
                    <div >
                        <label>Username</label>
                        <input type="text" value={this.state.userName} onChange={this.handleUserChange}/><br />
                    </div>
                    <div >
                        <label >Password</label>
                        <input type="text" value={this.state.passWord} onChange={this.handlePassChange} />
                    </div>
                    <button className="button" onClick={()=>this.state.userName.length > 0 && this.state.passWord.length > 0 ? this.handleSubmit() : alert('Please enter a valid username and password')}>submit</button>
                </div>
            </div>
        )
    }
}

export default userLogin