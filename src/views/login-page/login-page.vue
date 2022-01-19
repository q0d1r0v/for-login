<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="parent_div mt-13">
          <h1 class="login pt-5">Kirish</h1>
          <v-form ref="form" v-model="form_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :rules="usernameRules"
                  v-model="form.username"
                  outlined
                  label="Foydalanuvchi nomi"
                  class="ml-5 mr-5 mt-8"
                  @keyup.enter="sendForm()"
                />
              </v-col>
              <v-col cols="12" v-if="show">
                <v-text-field
                  v-model="form.password"
                  :rules="passwordRules"
                  append-icon="mdi-eye-off"
                  @click:append="showPassword()"
                  outlined
                  label="Parol"
                  type="password"
                  class="ml-5 mr-5 mt-0"
                  @keyup.enter="sendForm()"
                />
              </v-col>
              <v-col cols="12" v-else>
                <v-text-field
                  outlined
                  label="Parol"
                  class="ml-5 mr-5 mt-0"
                  append-icon="mdi-eye"
                  v-model="form.password"
                  @click:append="hidePassword()"
                  :rules="passwordRules"
                  @keyup.enter="sendForm()"
                />
              </v-col>
              <v-col cols="12">
                <div @click="sendForm()" class="login_btn">
                  <span class="login_text">KIRISH</span>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "login-page",
  created() {
    this.resetValidation();
  },
  computed: {
    ...mapGetters({ data: "login/data" }),
  },
  data() {
    return {
      usernameRules: [
        (v) => !!v || "Iltimos foydalanuvchi nomini kiriting",
        (v) =>
          /[A-Z|a-z|0-9]{5,50}/.test(v) ||
          "Foydalanuvchi nomi kamida 5ta bo'lishi kerak",
      ],
      passwordRules: [
        (v) => !!v || "Iltimos parolni kiriting",
        (v) =>
          /[A-Z]{1,15}[a-z]+[0-9]+[.*+?^!@#%&${}()|[\]\\]{1,15}/.test(v) ||
          "Parol kamida bitta katta harf va bitta kichik harf hamda son, symbollardan tashkil topgan bo'lishi kerak",
      ],
      show: true,
      form_validate: true,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("login", ["sendForm"]),
    ...mapActions("login", ["getUser"]),
    async sendForm() {
      if (this.form_validate && this.form.username && this.form.password) {
        if (this.form.username.length >= 5) {
          if (this.form.password.length >= 8) {
            try {
              this.$overlay(true);
              await this.$store.dispatch("login/sendForm", {
                username: this.form.username,
                password: this.form.password,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET_KEY,
                grant_type: process.env.VUE_APP_GRANT_TYPE,
              });
              this.getUser();
            } catch (e) {
              this.$toast.error(e.response.data.message || "Xatolik");
            } finally {
              this.$overlay(false);
            }
          } else {
            this.$toast.warning("Parolingiz kamida 8ta bo'lishi kerak");
          }
        } else {
          this.$toast.warning(
            "Foydalanuvchi nomi 5ta harfdan katta bo'lishi kerak"
          );
        }
      } else {
        this.$toast.warning("Iltimos ma'lumotlarni to'liq kiriting");
      }
    },
    async getUser() {
      try {
        await this.$store.dispatch("login/getUser");
        this.$router.push("/");
      } catch (e) {
        this.$toast.error(
          e.response.data.message || "Foydalanuvchi yuklab olinmadi"
        );
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    showPassword() {
      this.show = false;
    },
    hidePassword() {
      this.show = true;
    },
  },
};
</script>

<style scoped>
.parent_div {
  width: 550px;
  height: 400px;
  margin: auto;
  box-shadow: 0 0 18px -10px black;
  position: relative;
}
.login {
  text-align: center;
}
.login_btn {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(25, 118, 210, 0.88);
  text-align: center;
  padding: 3.8%;
  color: #fff;
  cursor: pointer;
}
.login_btn:active {
  background-color: rgba(25, 118, 210, 0.57);
}
.login_text {
  font-size: 20px;
  font-weight: 700;
}
</style>
