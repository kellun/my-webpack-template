import Vue from 'vue'
import Vuex from 'vuex'
import other from './modules/other'
import getters from "./getter"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters
})

export default store