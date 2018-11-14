import React from 'react'
import database from '../firebase'
import {BidButton} from './bidButton'

export class Timer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      time: 10,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.restartTimer = this.restartTimer.bind(this)
  }

  componentDidMount =() => {
    this.startTimer()
    this.changeListener()
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time
    })
    this.timer = setInterval(() => {
      console.log(this.state.time);
      if (this.state.time > 0) {
        this.setState({
          time: this.state.time - 1
        })
      }
      else {
        this.restartTimer()
        this.props.endBidding()
      }
    }, 1000);
  }

  resetTimer() {
    this.setState({time: 10, isOn: true})
  }

  restartTimer() {
    this.setState({time: 10, isOn: false})
    clearInterval(this.timer)
  }

  changeListener = () => {
    database.child('leagues/'+this.props.leagueName+'/draft/currentBid').on('value', (snapshot)=>{
      if (snapshot.val().biddingActive) {
        this.resetTimer()
      }
      else {
        this.restartTimer()
      }
    })
  }

  componentWillUnmount=()=> {
    this.restartTimer()
  }

  render() {
      return(
        <div className='timer horizontal'>
          <h1 className='hide-on-mobile'>Timer:</h1> <h1 className={this.state.time > 5 ? 'countdown' : 'alert countdown'}>{this.state.time}</h1>
        </div>
      )
    }
}
