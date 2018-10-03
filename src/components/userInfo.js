import React from 'react'

export class UserInfo extends React.Component {

  render() {

    return (
      <div>
        <p>Monies Left: {this.props.dollarsLeft}</p>
        <p>Movies Owned: {this.props.moviesOwned}</p>
        <p>Username: {this.props.user}</p>
      </div>
    )
  }

}
