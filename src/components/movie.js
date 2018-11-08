import React from 'react'

export class Movie extends React.Component {

  render() {

    return (
      <div className='draft-movie' onClick={this.props.clickHandler(this.props)}>
        <h4>{this.props.title}</h4>
        <p className='release-date'>{this.props.releaseDate}</p>
      </div>
    )
  }

}
