import React from 'react'

export class WonMovies extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showMovies:false
    }
  }

  toggleShow = () => {
    this.state.showMovies ? this.setState({showMovies:false}) : this.setState({showMovies:true})
  }

  render() {
    let userMovies = []
    for (var movie in this.props.movies[0]) {
      let oneMovie = <li key={movie}>{movie}: {this.props.movies[0][movie].boughtFor}</li>
      userMovies.push(oneMovie)
    }
    return (
      <div className=''>
        <h4 onClick={this.toggleShow}>{this.props.username}:  {this.props.total}</h4>
        {this.state.showMovies && <ul>{userMovies}</ul>}
      </div>
    )
  }

}
