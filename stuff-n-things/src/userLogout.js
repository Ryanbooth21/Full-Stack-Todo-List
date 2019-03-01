import React, { Component } from 'react';


class userLogOut extends React.Component{
    constructor(props){
        super(props)

    }


    render(){
        return (
            <div id="LogOutContainer">
                
                    <button onClick={()=>{this.props.logOut()}}>Logout</button>
                
            </div>
        )
    }
}

export default userLogOut