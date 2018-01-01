<template>
  <main class="container" v-if="uid">
    <h1>VOTES: {{votes.length}}</h1>
    <div style="padding: 32px" v-if="votes.length === 6">
      <h1>PASSES: {{passes.length}}</h1>
      <h1>FAILED: {{fails.length}}</h1>
    </div>
    <div class="row">
    <button @click="handlePass(uid)">PASS</button>
    <button @click="handleFail(uid)">FAIL</button>
    </div>
    <br>
    <br>
    <button @click="handleReset">RESET</button>
    <!-- <section v-for="(page, i) in pages" :class="`section-${i} ${active === i ? 'active' : ''}`" :key="i" :style="`background-color: ${page.color}`" @click.stop="active = i">
      <button @click.stop="active = null">close</button>
      {{page.title}}
      {{active}}
    </section> -->
    </main>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
const ref = firebase.database().ref('votes')
export default {
  data () {
    return {
      active: null,
      uid: null,
      passes: [],
      fails: [],
      votes: [],
      pages: [{
        title: 'TEST',
        color: 'blue'
      }, {
        title: 'TEst 2',
        color: 'green'
      }, {
        title: 'test 3',
        color: 'red'
      }, {
        title: 'test 4',
        color: 'yellow'
      }]
    }
  },
  mounted () {
    const vm = this
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('USER', user.uid)
        vm.uid = user.uid
      }
    })
    ref.on('value', snap => {
      if (snap.exists()) {
        let passes = []
        let fails = []
        let votes = []
        snap.forEach(childSnap => {
          if (childSnap.val() === 'PASS') {
            passes.push(childSnap.val())
          } else {
            fails.push(childSnap.val())
          }
          votes.push(childSnap.val())
        })
        vm.passes = passes
        vm.fails = fails
        vm.votes = votes
      } else {
        vm.passes = []
        vm.fails = []
        vm.votes = []
      }
    })
    firebase.auth().signInAnonymously().then(user => {
      console.log('signon', user.uid)
    }).catch(err => console.error(err))
  },
  methods: {
    handlePass (uid) {
      console.log('pass', uid)
      ref.child(uid).set('PASS')
    },
    handleFail (uid) {
      console.log('fail', uid)
      ref.child(uid).set('FAIL')
    },
    handleReset () {
      ref.remove()
    }
  }
}
</script>

<style scoped>
button {
  border: 1px solid black;
  display: block;
  width: 300px;
  padding: 32px;
  font-size: 32px;
}
button:hover {
  background: lightcoral;
  color: white;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
main {
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}
section {
  position: fixed;
  overflow: hidden;
  display: block;
  /* width: 50%;
  height: 50vh; */
  z-index: 1;
  transition: all 300ms ease;
}
section.section-0 {
  left: 0;
  top: 0;
  width: 38%;
  height: 62vh;
}
section.section-1 {
  right: 0;
  top: 0;
  width: 62%;
  height: 100vh;
}
section.section-2 {
  bottom: 0;
  width: 24%;
  height: 38vh;
}
section.section-3 {
  bottom: 0;
  left: 24%;
  height: 38vh;
  width: 24%;

}
section.active {
  width: 100%;
  height: 100vh;
  z-index: 100;
  /* top: 0; */
}
/* section.section-0.active, section.section-1.active {

} */
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
