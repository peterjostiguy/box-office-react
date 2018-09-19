import React from 'react'

export class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username:"",
      password:""
    }
  }

  render() {

    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.props.submitHandler(this.state)}>
          <input onChange={this.props.changeHandler(this.state)} type="text" name="username" defaultValue="" placeholder="Username" />
          <input type="text" onChange={this.props.changeHandler(this.state)} name="password" defaultValue="" placeholder="Password" />
          <input type="submit" name="" value="Submit" />
        </form>
      </div>
    )
  }

}
