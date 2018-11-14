import React from 'react'
import {Movies} from './movies'
import database from '../firebase'

export class AllOwnedMovies extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  sortMoviesByTotal = (allMovies) => {
    return allMovies.sort((a, b) => {
      return b.total - a.total
    })
  }

  findMovieTotals = async () => {
    let userTotal = 0
    const snapshot = await database.child('leagues/'+this.props.leagueName+'/users/'+this.props.username+'/movies').once('value')
    let allMovies = snapshot.val()
    let allMoviesArray = []
    for (var movie in allMovies) {
      if (movie !== 'exists') {
        allMovies[movie].title = movie
        allMoviesArray.push(allMovies[movie])
      }
    }
    allMovies = this.sortMoviesByTotal(allMoviesArray)
    allMovies = allMovies.map((e, i)=> {
      userTotal += e.total
      return <li key={i}>{e.title}:  {(e.total/1000000).toFixed(2)}M</li>
    })
    this.setState({allMovies: allMovies, userTotal: userTotal.toLocaleString()})
  }

  componentDidMount = () => {
    this.findMovieTotals()
  }

  render() {
    return (
      <ul  className='movies-list'>
        {this.state.allMovies}
      </ul>
    )
  }

}
