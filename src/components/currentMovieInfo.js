import React from 'react'

export class CurrentMovieInfo extends React.Component {

  render() {

    return (
      <div>
        <h3>{'title goes here'}</h3>
        <h3>Release Date: {'date goes here'}</h3>
        <h2>{'current user goes here'} is winning with {'bid goes here'}</h2>
      </div>
    )
  }

}
