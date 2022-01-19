import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login-page/login";
import register from "./modules/registration-page/register";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    register,
  },
});
