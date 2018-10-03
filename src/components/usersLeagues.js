import React from 'react'
import database from '../firebase'
import {League} from './league'

export class UsersLeagues extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usersLeagues: []
    }
  }

  getLeagues = async () => {
    const snapshot = await database.child('users').once('value')
    let usersLeagues = snapshot.val()[this.props.username].leagues
    if (usersLeagues) {
      usersLeagues = Object.keys(usersLeagues)
      usersLeagues = usersLeagues.filter((e) => e !== 'exists')
      usersLeagues = usersLeagues.map((e, i) => {
        return (
         <League key={'league_' + i} league={e} />
        )
      })
      this.setState({usersLeagues:usersLeagues})
    }
  }

  isAdmin = async (leagueName) => {
    const snapshot = await database.child('/leagues/'+leagueName+'/admin').once('value')
    const leagueAdmin = snapshot.val()
    return leagueAdmin === this.props.username
  }

  selectLeague = async (e) => {
    const leagueName = e.target.value
    const isAdmin = await this.isAdmin(leagueName)
    this.setState({selectedLeague: leagueName, isAdmin: isAdmin})
  }

  componentDidMount() {
    this.getLeagues()
    database.child('users/' + this.props.username).on('value', (snapshot) => {
      this.getLeagues()
    })
  }

  render() {
    if (this.state.selectedLeague && this.state.isAdmin) {
      return (
        <div>
          <h3>Nothing Here Yet!</h3>
          <button onClick={this.props.startDraft(this.state)}>Start Draft</button>
        </div>
      )
    }
    else if (this.state.selectedLeague) {
      return (
        <div>
          <h3>Nothing Here Yet!</h3>
        </div>
      )
    }
    else {
      return (
        <div>
          <h3>Your Leagues</h3>
          <select onChange={this.selectLeague}>
            <option>Select League</option>
            {this.state.usersLeagues}
          </select>
        </div>
      )
    }
  }

}
