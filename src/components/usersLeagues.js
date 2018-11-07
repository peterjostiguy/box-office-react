import React from 'react'
import database from '../firebase'
import {League} from './league'
import {JoinLeague} from './joinLeague'
import {LeagueData} from './leagueData'

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
         <League key={'league_' + i} league={e} clickHandler={this.selectLeague}  class={"user-league centered"} />
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

  selectLeague = (leagueName) => async (e) => {
    const isAdmin = await this.isAdmin(leagueName)
    this.setState({selectedLeague: leagueName, isAdmin: isAdmin})
    this.joinDraft(leagueName)
  }

  activateDraft = (leagueName) => () => {
    database.child('/leagues/'+leagueName+'/draft/isAvailable/').set(true)
  }

  getDraftUsers = async (selection) => {
    const snapshot = await database.child('leagues/'+selection+'/draft/users/'+this.props.username).once('value')
    const draftUser = snapshot.val()
    return draftUser
  }

  joinDraft = async (league) => {
    const selection = league
    const userExists = await this.getDraftUsers(selection)
    if (!userExists) {
      database.child('leagues/' + selection + '/draft/users/' + this.props.username).set({dollarsLeft: 200, moviesOwned:0, isActive: true})
    }
  }

  componentDidMount() {
    this.getLeagues()
    database.child('users/' + this.props.username).on('value', (snapshot) => {
      this.getLeagues()
    })
  }

  render() {

    return this.state.selectedLeague ?
      (<div className={'body'}><LeagueData username={this.props.username} leagueName={this.state.selectedLeague} isAdmin={this.state.isAdmin} activateDraft={this.activateDraft} /></div>)
      : (<div className='body'><div className={"user-leagues"}>
        {this.state.usersLeagues}
        <JoinLeague username={this.props.username}/>
      </div></div>)
  }

}
