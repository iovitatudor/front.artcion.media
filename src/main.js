import {createApp} from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createStore } from 'vuex'

import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import './assets/styles.css';

const store = createStore({
  state () {
    return {
      publicKey: null,
      balance: null,
    }
  },
  getters: {
    getPublicKey: (state) => state.publicKey,
    getBalance: (state) => state.balance ? state.balance / 1000000000 : 0,
    // getBalance: (state) => state.balance ? parseFloat((state.balance).toFixed(3)) : 0,
  },
  mutations: {
    addPublicKey (state, publicKey) {
      state.publicKey = publicKey;
    },
    addBalance (state, balance) {
      state.balance = balance;
    },
  },
  actions: {
    storePublicKey({commit}, publicKey) {
      commit('addPublicKey', publicKey);
    },
    storeBalance({commit}, balance) {
      commit('addBalance', balance);
    },
  }
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

createApp(App)
    .use(vuetify)
    .use(store)
    .mount('#app')
