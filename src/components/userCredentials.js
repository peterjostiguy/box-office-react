import React from 'react'
import database from '../firebase'
import {Login} from './login'
import {Signup} from './signup'

const bcrypt = require('bcryptjs')

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
    allUsers[state.username] ? alert("User already exists!") : this.makeNewUser(state, allUsers)
  }

  makeNewUser = (state, allUsers) => {
    bcrypt.hash(state.password, 10, (err, hash)=> {
      allUsers[state.username] = {
        password: hash,
        leagues: {exists:true}
      }
    database.child('users').set(allUsers)
    this.props.getUser(state.username)
    })
  }

  logIn = (state) => async (e) => {
    e.preventDefault()
    const snapshot = await database.child('users').once('value')
    let allUsers = snapshot.val()
    allUsers[state.username] ? this.checkPassword(state, allUsers) : alert("Username not found! If you're new here, sign up below")
  }

  checkPassword = (state, allUsers) => {
    bcrypt.compare(state.password, allUsers[state.username].password, (err, isMatch) => {
      isMatch ? this.props.getUser(state.username) : alert('Wrong Password Dum Dum')
    })
  }

  changeHandler = (state) => (e) => {
    e.preventDefault()
    state[e.target.name] = e.target.value
  }

  toggleSignUp = () => {
    this.state.signUp ? this.setState({signUp:false}) : this.setState({signUp:true})
  }

  render() {

    return (
      <div className={'centered vertical credentials'}>
        {this.state.signUp ?
          <Signup changeHandler={this.changeHandler} submitHandler={this.signUp} clickHandler={this.toggleSignUp}/>
          : <Login changeHandler={this.changeHandler} submitHandler={this.logIn} clickHandler={this.toggleSignUp}/>}
      </div>
    )
  }

}
