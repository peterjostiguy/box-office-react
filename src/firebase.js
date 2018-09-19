import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyCRU98WSXwbbR67R8s7axG2JOw1uBHRWqY",
  authDomain: "box-office-fantasy.firebaseapp.com",
  databaseURL: "https://box-office-fantasy.firebaseio.com/"
}

firebase.initializeApp(config)
let db = firebase.database()
let ref = db.ref()

export default ref
