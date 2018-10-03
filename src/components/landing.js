import React from 'react'
import {CreateLeague} from './createLeague'
import {UsersLeagues} from './usersLeagues'
import {JoinLeague} from './joinLeague'
import {ActiveDrafts} from './activeDrafts'
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
    allLeagues[state.leagueName] = {password: state.password, admin: this.props.username, draft: {currentBid: false, isActive:false, isAvailable:false, currentUserIndex: 0, movies: allMovies}}
    database.child('leagues').set(allLeagues)
  }

  activateDraft = (state) => () => {
    database.child('/leagues/'+state.selectedLeague+'/draft/isAvailable/').set(true)
  }

  changeHandler = (state) => (e) => {
    e.preventDefault()
    state[e.target.name] = e.target.value
  }

  render() {
    return (
      <div>
        <JoinLeague username={this.props.username}/>
        <UsersLeagues username={this.props.username} startDraft={this.activateDraft}/>
        <CreateLeague changeHandler = {this.changeHandler} submitHandler = {this.createLeague}/>
        <ActiveDrafts username={this.props.username}/>
      </div>
    )

  }

}
