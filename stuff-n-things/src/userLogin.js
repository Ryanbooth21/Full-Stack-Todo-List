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

    render(){
        return (
            <div id="LoginContainer">
            <h1>Login</h1>
                <form onSubmit={()=>this.state.userName.length > 0 && this.state.passWord.length > 0 ? this.props.logIn() : alert('Please enter a valid username and password')}>
                    <div id="userName">
                        <label>Username</label>
                        <input type="text" value={this.state.userName} onChange={this.handleUserChange}/><br />
                    </div>
                    <div id="passWord">
                        <label>Password</label>
                        <input type="text" value={this.state.passWord} onChange={this.handlePassChange} />
                    </div>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default userLogin