import React from 'react'
import database from '../firebase'
import {League} from './league'
import {Draft} from './draft'

export class ActiveDrafts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeDrafts: [],
      currentDraft: {},
      currentBid: {
        title: "",
        releaseDate: "",
        currentLeader: "",
        currentBidAmount: 0,
        currentUserIndex: 0
      }
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

  getDraftUsers = async (selection) => {
    const snapshot = await database.child('leagues/'+selection+'/draft/users/'+this.props.username).once('value')
    const draftUser = snapshot.val()
    return draftUser
  }

  getActiveDrafts = async () => {
    const snapshot = await database.child('leagues').once('value')
    let allLeagues = snapshot.val()
    let allLeaguesArray = Object.keys(allLeagues)
    allLeaguesArray = allLeaguesArray.filter((e) => {
      return this.state.usersLeagues.includes(e)
    })
    let activeDrafts = allLeaguesArray.filter((e) => allLeagues[e].draft.isAvailable && !allLeagues[e].draft.isOver)
    activeDrafts = activeDrafts.map((e, i) => {
      return (
        <League key={'league_' + i} league={e} />
      )
    })
    this.setState({activeDrafts:activeDrafts})
  }

  joinDraft = async (e) => {
    const selection = e.target.value
    this.setState({currentDraft: {league: selection}})
    const userExists = await this.getDraftUsers(selection)
    if (!userExists) {
      database.child('leagues/' + selection + '/draft/users/' + this.props.username).set({dollarsLeft: 200, moviesOwned:0, isActive: true})
    }
  }

  componentDidMount() {
    this.getUsersLeagues()
    this.getActiveDrafts()
    database.child('users/' + this.props.username).on('value', (snapshot) => {
      this.getUsersLeagues()
      this.getActiveDrafts()
    })
    database.child('leagues/').on('value', (snapshot) => {
      if (!this.state.currentDraft.league) {
        this.getUsersLeagues()
        this.getActiveDrafts()
      }
    })
  }

  render() {
    console.log("render");
    if (this.state.currentDraft.league) {
      return (
        <div>
          <Draft leagueName={this.state.currentDraft.league} username={this.props.username}/>
        </div>
      )
    }

    else {
      return (
        <div>
          <h3>Join Draft</h3>
          <select onChange={this.joinDraft}>
            <option>Join Draft</option>
            {this.state.activeDrafts}
          </select>
        </div>
      )
    }
  }

}
