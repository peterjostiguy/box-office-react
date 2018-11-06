import React from 'react'

export class CreateLeague extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      leagueName: ""
    }
  }

  render() {
    return (
      <div>
        <h3>Make New League</h3>
        <form onSubmit={this.props.submitHandler(this.state)}>
          <input type="text" onChange={this.props.changeHandler(this.state)} name="leagueName" defaultValue="" placeholder="League name" />
          <input type="text" onChange={this.props.changeHandler(this.state)} name="password" defaultValue="" placeholder="League Password" />
          <input type="submit" name="" value="Make it!" />
        </form>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    )
  }

}
