import React from 'react'
import {UserInfo} from '../components/userInfo'
import {BidButtonsContainer} from './bidButtonsContainer'

export class DashboardContainer extends React.Component {

  render(){
    return (
      <div>
        <UserInfo user = {this.props.user} />
        <BidButtonsContainer />
      </div>
    )
  }

}
