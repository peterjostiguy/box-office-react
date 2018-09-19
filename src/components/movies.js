import React from 'react'
import {Movie} from './movie'
import database from '../firebase'


export class Movies extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }



  handleClick = (props) => (e) => {
    let currentBidTitle = props.title
    let currentBidReleaseDate = props.releaseDate
    // resetBid()
    console.log(currentBidTitle, currentBidReleaseDate);
  }

  // async resetBid = () => {
  //   const snapshot = await database.once('value')
  //
  // }

  async componentDidMount(){
    const snapshot = await database.once('value')
    let allMovies = snapshot.val().movies
    let allMoviesArray = Object.keys(allMovies)
    let newMoviesArray = allMoviesArray.map((movie, i) => {
      return (
        <Movie key={"movie_" + i}  title={allMovies[movie].title} releaseDate={allMovies[movie].releaseDate} clickHandler={this.handleClick} />
      )
    })
    this.setState({movies: newMoviesArray})
  }

  render(){
    return (<div className="all-movies">{this.state.movies}</div>)
  }
}
