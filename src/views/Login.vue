<template>
  <div id="login">
    <v-container
      class="d-flex flex-column justify-center align-center" style="height:90vh"
    >
      <h1>Login</h1>
      <v-card class="pa-10 d-flex flex-column mt-5" width="40%">
        <v-form>
          <v-text-field
            ref="name"
            v-model="username"
            :rules="[() => !!username || 'Required.']"
            :error-messages="errorMessages"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min,]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            v-model="password"
            class="input-group--focused"
            @click:append="show3 = !show3"
            required
            @keyup.enter="loginUser"
          ></v-text-field>
        </v-form>
        <v-btn class="mt-5" type="submit" color="primary" @click.prevent="loginUser"> Login </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      show3: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      errorMessages: "",
      username: '',
      password: '',
      user: '',
      pass: ''
      
    };
  },
  created() {
    if (localStorage.getItem('username')) {
      this.$router.go(-1)
    }
  },
  methods: {
    loginUser() {
      this.user = this.$store.getters.getAccount.username
      this.pass = this.$store.getters.getAccount.password
      if (this.username === this.user && this.password === this.pass) {
         localStorage.setItem('username',JSON.stringify(this.username))
        window.location = "member"
      } else {
        alert('login ไม่สำเร็จ ลองใหม่อีกครั้ง')
      }
      this.username = ''
      this.password = ''
    },
  },
};
</script>

<style scoped>
</style>