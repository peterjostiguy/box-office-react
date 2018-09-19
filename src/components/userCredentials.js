import React from 'react'
import database from '../firebase'
import {Login} from './login'
import {Signup} from './signup'

export class UserCredentials extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      username: ""
    }
  }

  signUp = (state) => async (e) => {
    e.preventDefault()
    const snapshot = await database.child('users').once('value')
    let allUsers = snapshot.val()
    allUsers[state.username] = {password: state.password}
    database.child('users').set(allUsers)
  }

  logIn = (state) => async (e) => {
    e.preventDefault()
    const snapshot = await database.child('users').once('value')
    let allUsers = snapshot.val()
    if (allUsers[state.username] && allUsers[state.username].password === state.password) {
      // this.state.username = state.username
      this.props.getUser(state.username)
    }
    else {
      console.log("nope");
    }
  }

  changeHandler = (state) => (e) => {
    e.preventDefault()
    state[e.target.name] = e.target.value
    console.log(state);
  }

  render() {

    return (
      <div>
        <Login changeHandler={this.changeHandler} submitHandler={this.logIn}/>
        <Signup changeHandler={this.changeHandler} submitHandler={this.signUp}/>
      </div>
    )
  }

}
