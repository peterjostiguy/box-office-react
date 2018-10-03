import React from 'react'
import database from '../firebase'
import {League} from './league'

export class JoinLeague extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usersLeagues: []
    }
  }

  getUsersLeagues = async () => {
    const snapshot = await database.child('users').once('value')
    let usersLeagues = snapshot.val()[this.props.username].leagues
    if (usersLeagues) {
      usersLeagues = Object.keys(usersLeagues)
      usersLeagues = usersLeagues.filter((e) => e !== 'exists')
      this.setState({usersLeagues:usersLeagues})
    }
  }

  getAllLeagues = async () => {
    const snapshot = await database.child('leagues').once('value')
    let allLeagues = snapshot.val()
    allLeagues = Object.keys(allLeagues)
    allLeagues = allLeagues.filter((e) => {
      return !this.state.usersLeagues.includes(e)
    })
    allLeagues = allLeagues.map((e, i) => {
      return (
        <League key={'league_' + i} league={e} />
      )
    })
    this.setState({allLeagues:allLeagues})
  }

  joinLeague = (e) => {
    database.child('users/' + this.props.username + '/leagues/' + e.target.value).set({exists: true})
    database.child('leagues/' + e.target.value + '/users/' + this.props.username).set({total: 0})
  }

  componentDidMount() {
    this.getUsersLeagues()
    this.getAllLeagues()
    database.child('users/' + this.props.username).on('value', (snapshot) => {
      this.getUsersLeagues()
      this.getAllLeagues()
    })
  }

  render() {
    return (
      <div>
        <h3>Join League</h3>
        <select onChange={this.joinLeague}>
          <option>Join League</option>
          {this.state.allLeagues}
        </select>
      </div>
    )
  }

}
