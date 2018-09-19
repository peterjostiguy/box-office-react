import React from 'react'
import {UserInfo} from '../components/userInfo'

export class UserInfoContainer extends React.Component {

  render(){
    return <UserInfo user = {this.props.user}/>
  }

}
