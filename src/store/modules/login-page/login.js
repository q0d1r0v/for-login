import axios from "../../../axios";

const state = {
  data: null,
  user_data: null,
};

const getters = {
  data: (state) => {
    return state.data;
  },
  user_data: (state) => {
    return state.user_data;
  },
};

const mutations = {
  SET_TOKEN: (state, data) => {
    state.data = data;
  },
  SET_USER_DATA: (state, data) => {
    state.user_data = data.data;
  },
};

const actions = {
  async sendForm({ commit }, params) {
    const token = process.env.VUE_APP_TOKEN;
    try {
      const response = await axios.post(token, params);
      window.localStorage.setItem("access_token", response.data.access_token);
      window.localStorage.setItem("refresh_token", response.data.refresh_token);
      commit("SET_TOKEN", response);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getUser({ commit }) {
    try {
      const response = await axios.get("user/get_my_object");
      commit("SET_USER_DATA", response);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async changePassword(state, params) {
    try {
      const user_id = state.state.user_data.data.id;
      await axios.put(`user/update_password/${user_id}`, params);
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
