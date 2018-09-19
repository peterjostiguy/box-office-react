import React, { Component } from 'react'
import {MoviesContainer} from './containers/moviesContainer'
import {DashboardContainer} from './containers/dashboardContainer'
import {CurrentMovieInfoContainer} from './containers/currentMovieInfoContainer'
import {UserCredentials} from './components/userCredentials'
import {Landing} from './components/landing'
import './App.css'


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
    console.log(this.state);
  }

  render() {

    if(this.state.username){
      return (
        <div>
          <Landing />
          <CurrentMovieInfoContainer />
          <DashboardContainer user = {this.state.username}/>
          <MoviesContainer />
        </div>
      )
    }

    else {
      return <UserCredentials getUser = {this.getUser}/>
    }

  }
}

export default App;
