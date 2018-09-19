import React from 'react'
import {UserInfoContainer} from './userInfoContainer'
import {BidButtonsContainer} from './bidButtonsContainer'

export class DashboardContainer extends React.Component {

  render(){
    return (
      <div>
        <UserInfoContainer user = {this.props.user} />
        <BidButtonsContainer />
      </div>
    )
  }

}
