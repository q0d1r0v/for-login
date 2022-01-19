<template>
  <div>
    <v-dialog width="500px" v-model="data.show" persistent>
      <v-card width="500px" height="340px">
        <v-card-actions>
          <v-card-title style="font-size: 25px">
            Parolni almashtirish
          </v-card-title>
        </v-card-actions>
        <v-form
          class="ma-8 mt-1 mb-0"
          ref="form"
          lazy-validation
          v-model="form"
        >
          <v-text-field
            :rules="passwordRules"
            v-if="show_password"
            v-model="data.new_password"
            @click:append="hidePassword()"
            append-icon="mdi-eye"
            dense
            outlined
            label="Yangi parolni kiriting"
            class="mb-3"
            @keyup.enter="sendForm()"
          />
          <v-text-field
            :rules="passwordRules"
            @click:append="showPassword()"
            v-model="data.new_password"
            v-else
            append-icon="mdi-eye-off"
            type="password"
            dense
            outlined
            label="Yangi parolni kiriting"
            class="mb-3"
            @keyup.enter="sendForm()"
          />
          <v-text-field
            :rules="passwordRules"
            v-if="show_confirm_password"
            v-model="data.confirm_new_password"
            @click:append="hideConfirmPassword()"
            append-icon="mdi-eye"
            dense
            outlined
            label="Yangi parolni tasdiqlang"
            @keyup.enter="sendForm()"
          />
          <v-text-field
            :rules="passwordRules"
            v-else
            v-model="data.confirm_new_password"
            @click:append="showConfirmPassword()"
            append-icon="mdi-eye-off"
            type="password"
            dense
            outlined
            label="Yangi parolni tasdiqlang"
            @keyup.enter="sendForm()"
          />
          <v-divider class="mt-3" />
          <v-card-subtitle class="mt-3">
            <v-btn
              class="float-right ml-3"
              color="error"
              depressed
              @click="resetValidation()"
              >bekor qilish</v-btn
            >
            <v-btn
              @click="sendForm()"
              class="float-right"
              color="primary"
              depressed
              >saqlash</v-btn
            >
          </v-card-subtitle>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "change-password",
  data() {
    return {
      change_password: {
        new_password: "",
        confirm_new_password: "",
      },
      form: true,
      show_password: false,
      show_confirm_password: false,
      passwordRules: [
        (v) => !!v || "Iltimos parolni kiriting",
        (v) =>
          /[A-Z]{1,15}[a-z]+[0-9]+[.*+?^!@#%&${}()|[\]\\]{1,15}/.test(v) ||
          "Parol kamida bitta katta harf va bitta kichik harf hamda son, symbollardan tashkil topgan bo'lishi kerak",
      ],
    };
  },
  methods: {
    sendForm() {
      if (
        this.form &&
        this.data.new_password &&
        this.data.confirm_new_password
      ) {
        if (this.data.new_password === this.data.confirm_new_password) {
          this.$emit("sendForm", this.data);
          this.resetValidation();
        } else {
          this.$toast.error("Parolingizni tekshiring");
        }
      } else {
        this.$toast.warning("Iltimos ma'lumotlarni to'liq kiriting");
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
      this.data.show = false;
    },
    showPassword() {
      this.show_password = true;
    },
    hidePassword() {
      this.show_password = false;
    },
    showConfirmPassword() {
      this.show_confirm_password = true;
    },
    hideConfirmPassword() {
      this.show_confirm_password = false;
    },
  },
};
</script>

<style scoped></style>
