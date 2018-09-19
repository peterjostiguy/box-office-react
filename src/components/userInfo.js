import React from 'react'

export class UserInfo extends React.Component {

  render() {

    return (
      <div>
        <p>Monies Left: {100+1}</p>
        <p>Movies Owned: {0}</p>
        <p>Username: {this.props.user}</p>
      </div>
    )
  }

}
