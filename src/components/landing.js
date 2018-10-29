import React from 'react'
import {CreateLeague} from './createLeague'
import {UsersLeagues} from './usersLeagues'
import database from '../firebase.js'

export class Landing extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  createLeague = (state) => async (e) => {
    e.preventDefault()
    const snapshot = await database.child('leagues').once('value')
    let allLeagues = snapshot.val()
    const moviesSnapshot = await database.child('movies').once('value')
    let allMovies = moviesSnapshot.val()
    allLeagues[state.leagueName] = {password: state.password, admin: this.props.username, draft: {currentBid: {currentUserIndex: 0}, isActive:false, isAvailable:false, isOver: false, movies: allMovies}}
    database.child('leagues').set(allLeagues)
  }

  changeHandler = (state) => (e) => {
    e.preventDefault()
    state[e.target.name] = e.target.value
  }

  render() {
    return (
      <div>
        <UsersLeagues username={this.props.username}/>
        <CreateLeague changeHandler = {this.changeHandler} submitHandler = {this.createLeague}/>
      </div>
    )

  }

}
