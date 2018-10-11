import React from 'react'
import database from '../firebase'
import {BidButton} from './bidButton'

export class BidButtons extends React.Component {

  constructor(props){
    super(props)
    this.state = this.props.data
  }

  bidItUp = (props) => (e) => {
    if (this.canAfford(props)) {
      database.child('leagues/'+this.props.leagueName+'/draft/currentBid').set({
        currentLeader: this.props.username,
        currentBidAmount: this.state.currentBid.currentBidAmount + props.amount,
        title: this.state.currentBid.title,
        releaseDate: this.state.currentBid.releaseDate,
        currentBidIndex: this.state.currentUserIndex
      })
    }
    else {
      alert("If you have to ask, you can't afford it")
    }
  }

  canAfford = (props) => {
    if (this.state.currentBid.currentBidAmount + props.amount <= this.props.dollarsLeft ) {
      return true
    }
  }

  findNextUser = (currentIndex) => {
    if (currentIndex + 1 >= this.state.currentLineUp.length) {
      return 0
    }
    else {
      return currentIndex + 1
    }
  }

  endBidding = () => {
    database.child('leagues/'+this.props.leagueName+'/draft/users/'+this.state.currentBid.currentLeader).set({
      dollarsLeft: this.state.dollarsLeft - this.state.currentBid.currentBidAmount,
      moviesOwned: this.state.moviesOwned + 1,
      isActive: true 
    })
    database.child('leagues/'+this.props.leagueName+'/draft/movies/'+this.state.currentBid.title).set({
      available: false,
      owner: this.state.currentBid.currentLeader
    })
    database.child('leagues/'+this.props.leagueName+'/draft/currentBid').set({
      currentUserIndex: this.findNextUser(this.state.currentUserIndex)
    })
  }

  render() {
    this.state.currentBid = this.props.data.currentBid
    return (
      <div>
        <BidButton clickHandler={this.bidItUp} amount={1} />
        <BidButton clickHandler={this.bidItUp} amount={5} />
        <BidButton clickHandler={this.endBidding} amount={"End Bidding"} />
      </div>
    )
  }

}
