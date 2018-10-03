import React from 'react'

export class CurrentMovieInfo extends React.Component {

  render() {

    return (
      <div>
        <h3>{this.props.title}</h3>
        <h3>Release Date: {this.props.releaseDate}</h3>
        <h2>{this.props.currentLeader} is winning with {this.props.currentBidAmount}</h2>
      </div>
    )
  }

}
