import React from 'react'
import database from '../firebase'
import {WonMovies} from './wonMovies'

export class AllWonMovies extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }


  displayOwnedMovies = () => {
    database.child('leagues/' + this.props.leagueName + '/users/').on('value', async (snapshot) => {
      const allUsers = snapshot.val()
      let allUsersArray = []
      for (var user in allUsers) {
        let userMovies = [allUsers[user].movies]
        let userTotal = await database.child('leagues/'+this.props.leagueName+'/draft/users/'+user+'/dollarsLeft').once('value')
        userTotal = userTotal.val()
        let ownedMoviesElement = <WonMovies username={user} movies={userMovies} total={userTotal} key={user} />
        allUsersArray.push(ownedMoviesElement)
      }
      this.setState({allUsers: allUsersArray})
    })

  }

  componentDidMount = () => {
    this.displayOwnedMovies()
  }

  render() {
    return (
      <div className='all-users'>
        {this.state.allUsers}
      </div>
    )
  }

}
