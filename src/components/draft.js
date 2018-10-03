import React from 'react'
import {Movies} from './movies'
import {DashboardContainer} from '../containers/dashboardContainer'
import {UserInfo} from '../components/userInfo'
import {BidButtonsContainer} from '../containers/bidButtonsContainer'
// import {CurrentMovieInfoContainer} from '../containers/currentMovieInfoContainer'
import {CurrentMovieInfo} from './currentMovieInfo'
import database from '../firebase'

export class Draft extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      moviesOwned: 0,
      dollarsLeft: 0,
      currentDraftActive: false,
      currentBid: {
        title: "",
        releaseDate: "",
        currentLeader: "",
        currentBidAmount: 0,
        currentUserIndex: 0
      }
    }
  }

  startDraft = () => {
    database.child('leagues/' + this.props.leagueName + '/draft/isActive/').set(true)
  }

  isAdmin = async (leagueName) => {
    const snapshot = await database.child('/leagues/'+leagueName+'/admin').once('value')
    const leagueAdmin = snapshot.val()
    return leagueAdmin === this.props.username
  }

  selectLeague = async (selection) => {
    const leagueName = selection
    const isAdmin = await this.isAdmin(leagueName)
    this.setState({isAdmin: isAdmin})
  }

  bidListener = () => {
    database.child('leagues/' + this.props.leagueName +'/draft/currentBid').on('value', (snapshot) => {
      let currentBidStatus = snapshot.val()
      this.setState({currentBid: currentBidStatus})
    })
  }

  budgetListener = () => {
    database.child('leagues/' + this.props.leagueName +'/draft/users/' + this.props.username).on('value', (snapshot) => {
      let currentUserStatus = snapshot.val()
      if (currentUserStatus) {
        this.setState({
          dollarsLeft: currentUserStatus.dollarsLeft,
          moviesOwned: currentUserStatus.moviesOwned
        })
      }
    })
  }

  startStopListener = () => {
    database.child('leagues/' + this.props.leagueName +'/draft/isActive').on('value', (snapshot) => {
      let currentActiveStatus = snapshot.val()
      this.setState({currentDraftActive: currentActiveStatus})
    })
  }
  componentDidMount() {
    this.selectLeague(this.props.leagueName)
    this.bidListener()
    this.budgetListener()
    this.startStopListener()
  }

  render() {
    if (this.state.currentDraftActive) {
      if (this.state.currentBid.title) {
        return (
          <div>
            <CurrentMovieInfo title={this.state.currentBid.title} releaseDate={this.state.currentBid.releaseDate} currentBidAmount={this.state.currentBid.currentBidAmount} currentLeader={this.state.currentBid.currentLeader}/>
            <UserInfo user={this.props.username} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned} />
            <BidButtonsContainer data={this.state} username={this.props.username} leagueName={this.props.leagueName} dollarsLeft={this.state.dollarsLeft}/>
          </div>
        )
      }
      else {
        return (
          <div>
            <CurrentMovieInfo title={this.state.currentBid.title} releaseDate={this.state.currentBid.releaseDate} currentBidAmount={this.state.currentBid.currentBidAmount} currentLeader={this.state.currentBid.currentLeader}/>
            <UserInfo user={this.props.username} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned} />
            <Movies username={this.props.username} leagueName={this.props.leagueName} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned}/>
          </div>
        )
      }
    }
    else if (this.state.isAdmin) {
      return (
        <div>
          <button onClick={this.startDraft}>Start Draft</button>
          <h2>Draft Starting Soon!</h2>
        </div>
      )
    }
    else {
      return (
        <div>
          <h2>Draft Starting Soon!</h2>
        </div>
      )
    }
  }
}
