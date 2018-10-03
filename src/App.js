import React, { Component } from 'react'
// import {MoviesContainer} from './containers/moviesContainer'
// import {DashboardContainer} from './containers/dashboardContainer'
// import {CurrentMovieInfoContainer} from './containers/currentMovieInfoContainer'
import {UserCredentials} from './components/userCredentials'
import {Landing} from './components/landing'
import './App.css'

//Next stop is start draft adds 200 to each user, imports all movies from general DB
//Then I'm going to write code that removes movies from line up when Owned
//then I'm going to change who bids each time
//then I'll style
//then i'll find a ton of other bugs
let currentUser = '-L3xVTTFYXz5sLUqnkYC'


class App extends Component {

  constructor(props){

    super(props)
    this.state = {
      username: ""
    }

  }

  getUser = (username) => {
    this.setState({username: username})
  }

  render() {

    if(this.state.username){
      return (
        <div>
          <Landing username={this.state.username}/>

        </div>
      )
    }

    else {
      return <UserCredentials getUser = {this.getUser}/>
    }

  }
}

export default App;
