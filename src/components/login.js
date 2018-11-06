import React from 'react'

export class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }
  
  render() {

    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.props.submitHandler(this.state)} className='vertical login'>
          <input autoCapitalize="none" type="text" onChange={this.props.changeHandler(this.state)} name="username" defaultValue="" placeholder="Username" />
          <input type="password" onChange={this.props.changeHandler(this.state)} name="password" defaultValue="" placeholder="Password" />
          <input type="submit" name="" value="Log In" />
          <p>New To FBO? <a onClick={this.props.clickHandler}>Sign Up!</a></p>
        </form>
      </div>
    )
  }

}
