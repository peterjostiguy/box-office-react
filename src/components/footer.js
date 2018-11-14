import React from 'react'
import {CreateLeague} from './createLeague'
import database from '../firebase'

export class Footer extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  createLeague = (state) => async (e) => {
    e.preventDefault()
    const moviesSnapshot = await database.child('movies').once('value')
    let allMovies = moviesSnapshot.val()
    let leagueData = {password: state.password, admin: this.props.username, draft: {currentBid: {currentUserIndex: 0, biddingActive:false}, isActive:false, isAvailable:false, isOver: false, movies: allMovies}}
    database.child('leagues/'+state.leagueName).set(leagueData)
    this.joinLeague(state.leagueName)
    this.setState({})
    this.startNewLeagueToggle()
  }

  joinLeague = (leagueName) => {
    database.child('users/' + this.props.username + '/leagues/' + leagueName).set({exists: true})
    database.child('leagues/' + leagueName + '/users/' + this.props.username).set({total: 0})
  }

  changeHandler = (state) => (e) => {
    e.preventDefault()
    state[e.target.name] = e.target.value
  }

  startNewLeagueToggle = () => {
    this.state.makingLeague ? this.setState({makingLeague:false}) : this.setState({makingLeague:true})
  }

  render() {
    return this.props.username ?
      (<div className={'centered footer'}>
        {this.state.makingLeague && <CreateLeague submitHandler={this.createLeague} changeHandler={this.changeHandler} cancel={this.startNewLeagueToggle}/>}
        {!this.state.makingLeague && <p><a onClick={this.startNewLeagueToggle}>Make League</a></p>}
        <a onClick={this.props.logout}>Logout</a>
      </div>)
      : null
  }

}
