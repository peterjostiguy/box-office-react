import React from 'react'
import {Movie} from './movie'
import database from '../firebase'


export class Movies extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }



  handleClick = (props) => (e) => {
    this.resetBid(props.title, props.releaseDate)
  }

  resetBid = async (currentBidTitle, currentBidRelease) => {
    const snapshot = await database.child('/leagues/' + [this.props.leagueName]+ '/draft/currentUserIndex').once('value')
    let currentUserIndex = snapshot.val()
    let currentBidAmount = Number(prompt('whatchu wanna bid?'))
    if (!currentBidAmount || currentBidAmount === 0){
      alert("You gotta bid somethin'!")
    }
    else if(currentBidAmount > this.props.dollarsLeft) {
      alert('Nice try ya broke bitch')
    }
    else {
      this.updateCurrentBid(currentBidAmount, currentBidTitle, currentBidRelease, currentUserIndex)
    }
  }

  updateCurrentBid = (newBid, currentBidTitle, currentBidRelease, currentUserIndex) => {
    database.child('leagues/'+this.props.leagueName+'/draft/currentBid').set({
      currentLeader: this.props.username,
      currentBidAmount: newBid,
      title: currentBidTitle,
      releaseDate: currentBidRelease,
      next: "",
      currentUserIndex: currentUserIndex
    })
  }


  async componentDidMount(){

    const snapshot = await database.child('leagues/'+ this.props.leagueName+'/draft/movies').once('value')
    let allMovies = snapshot.val()
    let allMoviesArray = Object.keys(allMovies)
    let availableMovies = allMoviesArray.filter((movie) => {
      return allMovies[movie].available
    })
    let newMoviesArray = availableMovies.map((movie, i) => {
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
