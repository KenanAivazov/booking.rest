import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    contentLoaderList: true,
    modal: {
      active: false,
      head: '',
      text: '',
      body: '',
      pickDate: '',
      sits: '',
      sitsInfo: '',
      blackBg: true,
      isTrue: () => {},
      isFalse: () => {},
      isCloseFunc: () => {},
    },
    places: [],
    miniInfo: false,
    miniInfoBackground: false,
    restClick: false,
    miniInfoObject: {}
  },
  mutations: {
    SET_LIST_LOADER(state, status) {
      state.contentLoaderList = status
    },

    SET_MODAL(state, data) {
      if ( Boolean(data.isCloseFunc) ) {
        state.modal.isCloseFunc = data.isCloseFunc
      }
      state.modal = data;
    },
    SET_MINI_INFO_BG(state, status) {
      state.miniInfoBackground = status
    },
    SET_PLACES(state, place) {
      state.places = place
    },
    SET_MINI_INFO(state, status) {
      state.miniInfo = status
    },
    SET_OBJECT_MINI_INFO(state, obj) {
      state.miniInfoObject = obj
    },
    SET_REST_CLICK(state, status) {
      state.restClick = status
    }
  },
  actions: {

  }
});
