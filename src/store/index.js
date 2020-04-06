import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const index = {
  state: {
    formassets: {
      method: 'GET',
      headers: [
        { name: '', val: '' }
      ],
      params: [
        { name: '', val: '' }
      ],
      body: [
        { name: '', val: '' }
      ]
    },
    url: 'https://'
  },
  mutations: {
    setHeader (state, header) {
      state.formassets.headers.push(header)
    },
    removeHeader (state, index) {
      state.formassets.headers.splice(index, 1)
    },
    resetHeaders (state) {
      state.formassets.headers = []
    },
    setParam (state, param) {
      state.formassets.params.push(param)
    },
    removeParam (state, index) {
      state.formassets.params.splice(index, 1)
    },
    resetParams (state) {
      state.formassets.params = []
    },
    setBody (state, body) {
      state.formassets.body.push(body)
    },
    removeBody (state, index) {
      state.formassets.body.splice(index, 1)
    },
    resetBody (state) {
      state.formassets.body = []
    },
    setMethod (state, method) {
      state.formassets.method = method
    },
    setUri (state, url) {
      state.url = url
    }
  }
  // getters: {}
}

export default new Vuex.Store(index)
