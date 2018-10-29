import React from 'react'
import {Movies} from './movies'
import {DashboardContainer} from '../containers/dashboardContainer'
import {UserInfo} from '../components/userInfo'
import {BidButtonsContainer} from '../containers/bidButtonsContainer'
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

  turnListener = () => {
    database.child('leagues/' + this.props.leagueName +'/draft/currentBid/currentUserIndex').on('value', (snapshot) => {
      let currentUserIndex = snapshot.val()
      this.setState({currentUserIndex: currentUserIndex })
    })
  }

  startStopListener = () => {
    database.child('leagues/' + this.props.leagueName +'/draft/isActive').on('value', (snapshot) => {
      this.createOrder()
      let currentActiveStatus = snapshot.val()
      this.setState({currentDraftActive: currentActiveStatus})
    })
  }

  findNextUser = (currentIndex) => {
    if(this.state.currentLineUp){
      if (currentIndex + 1 >= this.state.currentLineUp.length) {
        return 0
      }
      else {
        return currentIndex
      }
    }
  }

  checkIfFinished = () => {
    if(this.state.moviesOwned === 10 || this.state.dollarsLeft === 0){
      this.removeFromLineUp()
    }
    if(this.state.moviesOwned < 10 && this.state.dollarsLeft > 0){
      this.addToLineUp()
    }
  }

  endDraft = () => {
    if (!this.state.currentLineUp.length) {
      database.child('leagues/' + this.props.leagueName + '/draft/isActive/').set(false)
      database.child('leagues/' + this.props.leagueName + '/draft/isAvailable/').set(false)
      database.child('leagues/' + this.props.leagueName + '/draft/isOver/').set(true)
    }
  }

  removeFromLineUp = () => {
    database.child('leagues/' + this.props.leagueName + '/draft/users/' + this.props.username + '/isActive').set(false)
    database.child('leagues/' + this.props.leagueName + '/draft/currentBid/currentUserIndex').set(this.findNextUser(this.state.currentBid.currentUserIndex))
  }

  addToLineUp = () => {
    database.child('leagues/' + this.props.leagueName + '/draft/users/' + this.props.username + '/isActive').set(true)
  }

  createOrder = () => {
    database.child('leagues/' + this.props.leagueName +'/draft/users').on('value', (snapshot) => {
      let currentActiveUsers = snapshot.val()
      if (currentActiveUsers) {
        let currentActiveUsersArray = Object.keys(currentActiveUsers)
        currentActiveUsersArray = currentActiveUsersArray.filter((e) => {
          return currentActiveUsers[e].isActive
        })
        this.setState({currentLineUp: currentActiveUsersArray})
      }
    })
  }

  componentDidMount() {
    this.selectLeague(this.props.leagueName)
    this.bidListener()
    this.budgetListener()
    this.startStopListener()
    this.turnListener()
  }

  render() {
    if (this.state.currentDraftActive) {
      this.endDraft()
      this.checkIfFinished()
      if (this.state.currentBid.title) {
        return (
          <div>
            <CurrentMovieInfo title={this.state.currentBid.title} releaseDate={this.state.currentBid.releaseDate} currentBidAmount={this.state.currentBid.currentBidAmount} currentLeader={this.state.currentBid.currentLeader}/>
            <UserInfo user={this.props.username} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned} />
            <BidButtonsContainer data={this.state} username={this.props.username} leagueName={this.props.leagueName} dollarsLeft={this.state.dollarsLeft}/>
          </div>
        )
      }
      else if (this.state.currentLineUp[this.state.currentUserIndex] === this.props.username){
        return (
          <div>
            <CurrentMovieInfo title={this.state.currentBid.title} releaseDate={this.state.currentBid.releaseDate} currentBidAmount={this.state.currentBid.currentBidAmount} currentLeader={this.state.currentBid.currentLeader}/>
            <UserInfo user={this.props.username} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned} />
            <Movies username={this.props.username} leagueName={this.props.leagueName} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned}/>
          </div>
        )
      }
      else {
        return (
          <div>
            <UserInfo user={this.props.username} dollarsLeft={this.state.dollarsLeft} moviesOwned={this.state.moviesOwned} />
            <h1>Hang tight for the next movie</h1>
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
