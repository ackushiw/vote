import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
const config = {
  apiKey: 'AIzaSyDjecjTa-0KkisyAyV1pVR50lLpTEDvU4Y',
  authDomain: 'ackushiw.firebaseapp.com',
  databaseURL: 'https://ackushiw.firebaseio.com',
  projectId: 'firebase-ackushiw',
  storageBucket: 'firebase-ackushiw.appspot.com',
  messagingSenderId: '5437409204'
}
const fb = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
const ref = fb.database().ref()
const votesRef = ref.child('votes')

export const state = () => ({
  show: false,
  uid: null,
  votes: []
})

export const mutations = {
  setShow (state, show) {
    state.show = show
  },
  setVotes (state, votes) {
    state.votes = votes
  },
  setUser (state, uid) {
    state.uid = uid
  }
}

export const actions = {
  addVote ({ state }, vote) {
    console.log('ACTION_VOTE', state.uid)
    votesRef.child(state.uid).set(vote)
  },
  handleReset ({ commit }) {
    console.log('RESET')
    votesRef.remove()
    commit('setVotes', [])
  },
  handleShow ({ state }) {
    ref.child('show').set(!state.show)
  }
}

export const getters = {
  getVoteCount: state => {
    return state.votes.length || 0
  },
  getPassCount: state => {
    if (!state.votes) {
      return 0
    }
    console.log('Passes', state.votes)
    return state.votes.filter(vote => vote === 'PASS').length
  },
  getFailCount: state => {
    if (!state.votes) {
      return 0
    }
    console.log('FAILS', state.votes)
    return state.votes.filter(vote => vote === 'FAIL').length
  }
}
