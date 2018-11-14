import React from 'react'
import database from '../firebase'
import {Draft} from './draft'
import {AllOwnedMovies} from './allOwnedMovies'

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
    allUsers = allUsers.map((e, i)=> {
      let formattedTotal = (e.total/1000000).toFixed(2)
      return <li key={i}>{e.username}:  {formattedTotal}M</li>
    })
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

  componentDidMount = () => {
    this.findUserTotals()
    this.checkDraftStatus()
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
                  <h4>Hi, {this.props.username}</h4>
                  <h3>${this.state.userTotal}</h3>
                </div>
              </div>
              <div>
                <h3>Leaderboard</h3>
                <ul className='leaderboard'>
                  {this.state.allUsers}
                </ul>
              </div>
              <div>
                <h3>Your Movies</h3>
                <AllOwnedMovies leagueName={this.props.leagueName} username={this.props.username}/>
              </div>
            </div>
          )}
          {draftStatus && !draftStatus.isOver && !draftStatus.isAvailable && this.props.isAdmin && (
            <button className={'dont-shrink'} onClick={this.props.activateDraft(this.props.leagueName)}>Create Draft</button>
          )}
          {draftStatus && !draftStatus.isOver && !draftStatus.isAvailable && !this.props.isAdmin && (
            <div>
              <h2>There's nothing here yet! </h2>
              <h2>Contact your admin to find out when the draft is scheduled. </h2>
            </div>
          )}
          {draftStatus && draftStatus.isAvailable && (
            <Draft leagueName={this.props.leagueName} username={this.props.username}/>
          )}
        </div>
      )
  }

}
