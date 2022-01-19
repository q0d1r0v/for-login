<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="parent_div mt-13">
          <h1 class="login pt-5">Ro'yxatdan o'tish</h1>
          <v-form ref="form" v-model="form_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.fullname"
                  :rules="[
                    (v) => !!v || 'Foydalanuvchi ism familyasini kiriting',
                  ]"
                  outlined
                  label="Foydalanuvchi ism familyasi"
                  class="ml-5 mr-5 mt-8"
                  @keyup.enter="sendForm()"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.username"
                  :rules="[(v) => !!v || 'Foydalanuvchi nomini kiriting']"
                  outlined
                  label="Foydalanuvchi nomi"
                  class="ml-5 mr-5 mt-0"
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
              <v-col cols="12" v-if="confirmPassword">
                <v-text-field
                  v-model="form.confirmPassword"
                  :rules="passwordRules"
                  append-icon="mdi-eye-off"
                  @click:append="showConfirmPassword()"
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
                  v-model="form.confirmPassword"
                  @click:append="hideConfirmPassword()"
                  :rules="passwordRules"
                  @keyup.enter="sendForm()"
                />
              </v-col>
              <v-col cols="12">
                <div @click="sendForm()" class="login_btn">
                  <span class="login_text">RO'YXATDAN O'TISH</span>
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
  name: "register-page",
  created() {
    this.resetValidation();
  },
  computed: {
    ...mapGetters({ message: "register/message" }),
  },
  data() {
    return {
      passwordRules: [
        (v) => !!v || "Iltimos parolni kiriting",
        (v) =>
          /[A-Z]{1,15}[a-z]+[0-9]+[.*+?^!@#%&${}()|[\]\\]{1,15}/.test(v) ||
          "Parol kamida bitta katta harf va bitta kichik harf hamda son, symbollardan tashkil topgan bo'lishi kerak",
      ],
      confirmPassword: true,
      show: true,
      form_validate: true,
      form: {
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    ...mapActions("register"["sendForm"]),
    async sendForm() {
      if (
        this.form_validate &&
        this.form.username &&
        this.form.password &&
        this.form.confirmPassword
      ) {
        if (this.form.username.length >= 5) {
          if (
            this.form.password.length &&
            this.form.confirmPassword.length >= 8
          ) {
            if (this.form.password === this.form.confirmPassword) {
              try {
                this.$overlay(true);
                await this.$store.dispatch("register/sendForm", {
                  first_name: this.form.fullname,
                  username: this.form.username,
                  password: this.form.password,
                });
                this.form.fullname = "";
                this.form.username = "";
                this.form.password = "";
                this.form.confirmPassword = "";
                this.$toast.success("Foydalanuvchi yaratildi");
                this.$refs.form.resetValidation();
              } catch (e) {
                this.$toast.error(
                  e.response.data.message || "Bunday foydalanuvchi mavjud"
                );
              } finally {
                this.$overlay(false);
              }
            } else {
              this.$toast.error("Parolingizni tekshiring");
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
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    showPassword() {
      this.show = false;
    },
    hidePassword() {
      this.show = true;
    },
    showConfirmPassword() {
      this.confirmPassword = false;
    },
    hideConfirmPassword() {
      this.confirmPassword = true;
    },
  },
};
</script>

<style scoped>
.parent_div {
  width: 550px;
  height: 600px;
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
