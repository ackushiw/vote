import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default ({ store }) => {
  const db = firebase.database()
  const ref = db.ref()
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('USER', user.uid)
      store.commit('setUser', user.uid)
    } else {
      firebase.auth().signInAnonymously()
    }
  })
  db.ref('show').on('value', snap => {
    store.commit('setShow', snap.exists() && snap.val())
  })
  ref.child('votes').on('value', snap => {
    if (snap.exists()) {
      let votes = []
      snap.forEach(childSnap => {
        console.log('vote update', childSnap.val())
        votes.push(childSnap.val())
      })
      console.log('ARRAY', votes)
      store.commit('setVotes', votes)
    }
  })
}
