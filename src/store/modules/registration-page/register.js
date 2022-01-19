import axios from "../../../axios";

const state = {
  message: null,
};

const getters = {
  message: (state) => {
    return state.message;
  },
};

const mutations = {
  SET_MESSAGE: (state, data) => {
    state.message = data;
  },
};

const actions = {
  async sendForm({ commit }, params) {
    try {
      const response = await axios.post("user/register", { params });
      commit("SET_MESSAGE", response);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
