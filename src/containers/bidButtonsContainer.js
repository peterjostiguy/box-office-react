import React from 'react'
import {BidButtons} from '../components/bidButtons'

export class BidButtonsContainer extends React.Component {

  render(){
    return (
      <BidButtons username={this.props.username} leagueName={this.props.leagueName} data={this.props.data} dollarsLeft={this.props.dollarsLeft} isAdmin={this.props.isAdmin} isWinning={this.props.isWinning} userIsActive={this.props.userIsActive}/>
    )
  }

}
