import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vuetifyOverlay from "vuetify-overlay";

Vue.config.productionTip = false;

const options = {
  // You can set your default options here
};

Vue.use(Toast, options);
Vue.use(vuetifyOverlay);

new Vue({
  router,
  store,
  Toast,
  vuetify,
  vuetifyOverlay,
  render: (h) => h(App),
}).$mount("#app");
