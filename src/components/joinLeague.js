import React from 'react'
import database from '../firebase'

export class JoinLeague extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usersLeagues: [],
      joinLeague: false,
      leagueToJoin: '',
      leaguePassword: ''
    }
    this.handleChangeLeagueName = this.handleChangeLeagueName.bind(this);
    this.handleChangeLeaguePassword = this.handleChangeLeaguePassword.bind(this);
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
    return Object.keys(allLeagues)
  }

  getLeaguePassword = async (leagueName) => {
    const snapshot = await database.child('leagues/'+leagueName+"/password").once('value')
    return snapshot.val()
  }

  makeAllLeaguesJSX = async () => {
    let allLeagues = await this.getAllLeagues()
    allLeagues = allLeagues.filter((e) => {
      return !this.state.usersLeagues.includes(e) && e !== 'exist'
    })
    allLeagues = allLeagues.map((e, i) => {
      return (
        <option>{e}</option>
      )
    })
    this.setState({allLeagues:allLeagues})
  }

  joinLeague = async (e) => {
    e.preventDefault()
    let league = await this.getLeaguePassword(this.state.leagueToJoin)
    if (this.state.leaguePassword === league) {
      database.child('users/' + this.props.username + '/leagues/' + this.state.leagueToJoin).set({exists: true})
      database.child('leagues/' + this.state.leagueToJoin + '/users/' + this.props.username).set({total: 0})
      this.setState({joinLeague:false})
    }
    else {alert('Wrong Password. Contact League Admin to join.')}
  }

  handleChangeLeagueName = (e) => {
    this.setState({leagueToJoin: e.target.value});
  }

  handleChangeLeaguePassword = (e) => {
    this.setState({leaguePassword: e.target.value});
  }

  clickJoin = () => {
    this.setState({joinLeague:true})
  }

  componentDidMount() {
    this.getUsersLeagues()
    this.makeAllLeaguesJSX()
    database.child('users/' + this.props.username).on('value', (snapshot) => {
      this.getUsersLeagues()
      this.makeAllLeaguesJSX()
    })
  }

  render() {

    var joinClasses = 'user-league join-league'

    return (
      <div className={joinClasses} onClick={this.clickJoin}>
        {this.state.joinLeague ?
          (<form onSubmit={this.joinLeague}>
              <select value={this.state.leagueToJoin} onChange={this.handleChangeLeagueName}>
                <option>Select League</option>
                {this.state.allLeagues}
              </select>
              <input type='password' placeholder='password' value={this.state.leaguePassword} onChange={this.handleChangeLeaguePassword}/>
              <input type='submit' value='Join!'/>
            </form>)
          : (<div className='small-circle centered'>
            <h3>+</h3>
          </div>)
        }
      </div>
    )

  }

}
