import React from 'react'

export class UserInfo extends React.Component {

  render() {

    return (
      <div className='user-info'>
        <h4>What up {this.props.user}?</h4>
        <h4>You have {this.props.dollarsLeft} to spend</h4>
        <h4>You own {this.props.moviesOwned} movies</h4>
      </div>
    )
  }

}
