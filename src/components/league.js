import React from 'react'

export class League extends React.Component {

  render() {
    return (
      <div onClick={this.props.clickHandler(this.props.league)} className={this.props.class}>
        <h3>{this.props.league}</h3>
        <h4>{this.props.userTotal}</h4>
      </div>
    )
  }

}
