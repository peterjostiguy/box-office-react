import React from 'react'
import database from '../firebase'
import {Draft} from './draft'

export class LeagueData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {allUsers:[]}
  }

  findUserTotals = async () => {
    const snapshot = await database.child('leagues/'+this.props.leagueName+'/users').once('value')
    let allUsers = snapshot.val()
    let allUsersArray = []
    for (var user in allUsers) {
      allUsers[user].username = user
      if(user === this.props.username){
        var currentUserTotal = allUsers[user].total
      }
      allUsersArray.push(allUsers[user])
    }
    allUsers = this.sortUsersByTotal(allUsersArray)
    allUsers = allUsers.map((e, i)=> <li key={i}>{e.username}:  {(e.total/1000000).toFixed(2)}M</li>)
    this.setState({allUsers:allUsers, currentUserTotal:currentUserTotal})
  }

  checkDraftStatus = () => {
    database.child('leagues/'+this.props.leagueName+'/draft').on('value', (snapshot) => {
      let draftStatus = snapshot.val()
      this.setState({draftStatus: draftStatus})
    })
  }

  sortUsersByTotal = (allUsers) => {
    return allUsers.sort((a, b) => {
      return b.total - a.total
    })
  }

  sortMoviesByTotal = (allMovies) => {
    return allMovies.sort((a, b) => {
      return b.total - a.total
    })
  }

  findMovieTotals = async () => {
    const snapshot = await database.child('leagues/'+this.props.leagueName+'/users/'+this.props.username+'/movies').once('value')
    let allMovies = snapshot.val()
    let allMoviesArray = []
    for (var movie in allMovies) {
      if (movie !== 'exists') {
        allMovies[movie].title = movie
        allMoviesArray.push(allMovies[movie])
      }
    }
    allMovies = this.sortMoviesByTotal(allMoviesArray)
    allMovies = allMovies.map((e, i)=> <li key={i}>{e.title}:  {(e.total/1000000).toFixed(2)}M</li>)
    this.setState({allMovies: allMovies})
  }

  componentDidMount = () => {
    this.findUserTotals()
    this.checkDraftStatus()
    this.findMovieTotals()
  }

  render(){
    const draftStatus = this.state.draftStatus
      return  (
        <div className='league-data'>
          {draftStatus && draftStatus.isOver && (
            <div>
              <div className='league-top-container'>
                <h1 className='league-name'> {this.props.leagueName} </h1>
                <div className='league-user-info'>
                  <h4>{this.props.username}</h4>
                  <h3>${this.state.currentUserTotal}</h3>
                </div>
              </div>
              <div className='leaderboard'>
                <h3>Leaderboard</h3>
                <ul>
                  {this.state.allUsers}
                </ul>
              </div>
              <div className='movies-list'>
                <h3>Your Movies</h3>
                <ul>
                  {this.state.allMovies}
                </ul>
              </div>
            </div>
          )}
          {draftStatus && !draftStatus.isOver && !draftStatus.isAvailable && this.props.isAdmin && (
            <button onClick={this.props.activateDraft(this.props.leagueName)}>Create Draft</button>
          )}
          {draftStatus && draftStatus.isAvailable && (
            <Draft leagueName={this.props.leagueName} username={this.props.username}/>
          )}
        </div>
      )
  }

}
