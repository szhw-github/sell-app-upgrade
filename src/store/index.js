import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: () => ({
      initializedCountList: [],
      countList: [],
      currentIndex: 0,
      clickIndex: 0,
      goods: null,
      seller: null,
      ratings: null,
      showShopcartDetail: false,
      totalPrice: 0,
      elementClicked: [],
      foodClickedIndex: {}
    }),
    mutations,
    getters,
    actions
  })
}
