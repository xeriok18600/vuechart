import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    budget: 3000,
    newBudget: 3000,
    list: [],
    analyzeData: [],
  },
  mutations: {
    calculate(state, v) {
      state.newBudget = v;
    },
    setList(state, v) {
      state.list = Array.from(v);
    },
  },
  actions: {},
  getters: {
    // remainingQuota(){}
  },
  modules: {},
});
