<template>
  <v-app>
    <v-app-bar app dark color="primary" class="">
      <h1>for-login</h1>
      <v-spacer />
      <v-btn icon @click="goHome()">
        <v-icon v-if="user_data"> mdi-logout </v-icon>
        <v-icon v-else> mdi-account </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  computed: {
    ...mapGetters({ user_data: "login/user_data" }),
  },
  data: () => ({
    //
  }),
  methods: {
    goHome() {
      if (this.user_data) {
        window.localStorage.clear();
        window.location.reload();
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
