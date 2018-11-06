import React from 'react'

export class UserInfo extends React.Component {

  render() {

    return (
      <div className='user-info'>
        <p>What up {this.props.user}?</p>
        <p>You have {this.props.dollarsLeft} to spend</p>
        <p>You own {this.props.moviesOwned} movies</p>
      </div>
    )
  }

}
