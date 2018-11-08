import React from 'react'

export class BidButton extends React.Component {

  render() {
    return typeof this.props.amount === 'number' ?
     <button onClick={this.props.clickHandler(this.props)}>+{this.props.amount}</button>
    : <button className='end' onClick={this.props.clickHandler}>{this.props.amount}</button>
  }

}
