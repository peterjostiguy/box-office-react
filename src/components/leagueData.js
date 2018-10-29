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
    allUsers = allUsers.map((e)=> <li>{e.username}:  {e.total}</li>)
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
        <div>
          <h1> {this.props.leagueName} </h1>
          {draftStatus && draftStatus.isOver && (
            <div>
              <div>
                <h3>{this.props.username}</h3>
                <h2>$ {this.state.currentUserTotal}</h2>
              </div>
              <div className="leaderboard">
                <h3>Leaderboard</h3>
                <ol>
                  {this.state.allUsers}
                </ol>
              </div>
              <h1> your movies, one by one </h1>
            </div>
          )}
          {draftStatus && !draftStatus.isAvailable && this.props.isAdmin && (
            <button onClick={this.props.activateDraft(this.props.leagueName)}>Create Draft</button>
          )}
          {draftStatus && draftStatus.isAvailable && (
            <Draft leagueName={this.props.leagueName} username={this.props.username}/>
          )}
        </div>
      )
  }

}
