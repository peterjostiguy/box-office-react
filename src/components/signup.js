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
        <form onSubmit={this.props.submitHandler(this.state)} className='vertical login'>
          <input onChange={this.props.changeHandler(this.state)} type="text" name="username" defaultValue="" placeholder="Username" autoCapitalize="none" />
          <input type="password" onChange={this.props.changeHandler(this.state)} name="password" defaultValue="" placeholder="Password" />
          <input type="submit" name="" value="Register" />
          <p>Already a member? <a onClick={this.props.clickHandler}>Login!</a></p>
        </form>
      </div>
    )
  }

}
