import React from 'react'

export class BidButton extends React.Component {

  render() {

    if (typeof this.props.amount === 'number') {
      return <button onClick={this.props.clickHandler(this.props)}>+{this.props.amount}</button>
    }
    else {
      return <button onClick={this.props.clickHandler}>{this.props.amount}</button>
    }


  }

}
