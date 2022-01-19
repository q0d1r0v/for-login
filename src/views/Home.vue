<template>
  <div>
    <div v-if="user_data">
      <div
        v-if="
          user_data.data.expired_password === 1 ||
          user_data.data.expired_password === false
        "
        class="parent_div pt-5"
      >
        <span
          >Assalomualeykum
          <span style="font-size: 18px; font-weight: 800">{{
            user_data.data.name ? user_data.data.name : ""
          }}</span>
          siz ro'yxatdan o'tgansiz</span
        ><v-btn @click="logOut()" color="primary" block depressed cl ass="mt-5">
          <span class="mr-1">log-out</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <div v-if="user_data.data.expired_password === false">
          <h3 style="color: orange">
            parolingizni muddati yakunlanmoqda iltimos parolingizni
            almashtiring!
          </h3>
          <span
            class="float-right change_password"
            style="border: 1px solid red; padding: 5px"
            @click="showChangePasswordDialog()"
            >parolni almashtirish</span
          >
        </div>
      </div>
    </div>
    <div v-if="user_data">
      <div
        v-if="user_data.data.expired_password === true"
        class="parent_div pt-5"
      >
        <h3>Dasturdan foydalanish uchun parolni yangilang!</h3>
        <span
          class="float-right change_password"
          @click="showChangePasswordDialog()"
          >parolni almashtirish</span
        >
      </div>
    </div>
    <div class="parent_div pt-5" v-if="!user_data">
      <div @click="goLoginPage()" class="child_div mt-15">
        <span class="text">KIRISH</span>
      </div>
      <div @click="goRegisterPage" class="child_div mt-5">
        <span class="text">RO'YXATDAN O'TISH</span>
      </div>
    </div>
    <changePassword
      v-model="change_password.show"
      :data="change_password"
      @sendForm="changePassword()"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import changePassword from "../components/change-password";
export default {
  name: "Home",
  components: { changePassword },
  computed: {
    ...mapGetters({ user_data: "login/user_data" }),
  },
  data() {
    return {
      change_password: {
        show: false,
        new_password: "",
        confirm_new_password: "",
      },
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapActions("login", ["getUser"]),
    async changePassword() {
      try {
        this.$overlay(true);
        await this.$store.dispatch("login/changePassword", {
          new_password: this.change_password.new_password,
        });
        this.$toast.success("Parol yangilandi");
        window.location.reload();
      } catch (e) {
        this.$toast.error(e.response.data.message || "Xatolik");
      } finally {
        this.$overlay(false);
      }
    },
    showChangePasswordDialog() {
      this.change_password.show = true;
      this.change_password.new_password = "";
      this.change_password.confirm_new_password = "";
    },
    logOut() {
      window.localStorage.removeItem("access_token");
      window.location.reload();
    },
    getUser() {
      try {
        this.$overlay(true);
        this.$store.dispatch("login/getUser");
      } catch (e) {
        this.$toast.error(
          e.response.data.message || "Foydalanuvchi yuklab olinamdi"
        );
      } finally {
        this.$overlay(false);
      }
    },
    goLoginPage() {
      this.$router.push("/login");
    },
    goRegisterPage() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
.parent_div {
  width: 400px;
  height: 600px;
  margin: auto;
}
.child_div {
  width: 100%;
  background-color: rgba(25, 118, 210, 0.88);
  color: #fff;
  text-align: center;
  padding: 15px;
  cursor: pointer;
}
.child_div:active {
  background-color: rgba(25, 118, 210, 0.57);
}
.text {
  font-size: 20px;
  font-weight: 700;
}
.change_password {
  color: red;
  cursor: pointer;
  font-weight: 600;
}
.change_password:active {
  color: rgba(255, 0, 0, 0.53);
}
</style>
