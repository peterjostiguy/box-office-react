import React, { Component } from 'react'
import Cookies from 'universal-cookie';
// import {MoviesContainer} from './containers/moviesContainer'
// import {DashboardContainer} from './containers/dashboardContainer'
// import {CurrentMovieInfoContainer} from './containers/currentMovieInfoContainer'
import {UserCredentials} from './components/userCredentials'
// import {Landing} from './components/landing'
import {Header} from './components/header'
import {Footer} from './components/footer'
import './App.css'
import {UsersLeagues} from './components/usersLeagues'

//timer
//show what movies *you* own during draft
//find way to show who owns what during draft
//make it so movies scroll right (fix footer, mostly)
//then I'll style
//Be able to click through to other users
//update each movies total from api feature
//then i'll find a ton of other bugs



class App extends Component {

  constructor(props){

    super(props)
    this.state = {
      username: ""
    }

  }

  getUser = (username) => {
    const cookies = new Cookies()
    cookies.set('username', username, { path: '/' })
    this.setState({username: username})
  }

  logout = () => {
    const cookies = new Cookies()
    var username = cookies.remove('username')
    this.setState({username: username})
  }

  componentDidMount = () => {
    const cookies = new Cookies()
    var username = cookies.get('username')
    this.setState({username: username})
  }

  render() {

    return(
      <div className={'container'}>
        <Header />
        <div className={'centered middle'}>
          {this.state.username && this.state.username !== "undefined" ?
            <UsersLeagues username={this.state.username}/>
            : <UserCredentials getUser = {this.getUser}/>}
        </div>
        <Footer username={this.state.username} logout={this.logout}/>
      </div>
    )

  }
}

export default App;
