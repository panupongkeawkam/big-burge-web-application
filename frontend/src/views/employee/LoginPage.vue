<template>
  <div ref="container" class="container d-flex flex-column justify-content-center">
    <div class="row" style="height: 85% !important">
      <div
        class="col-7 d-flex flex-column justify-content-center align-items-center shadow bg-theme-5"
        style="
          border-radius: 1.5rem 0 0 1.5rem;
        "
      >
        <h1 class="fw-bold mb-2 text-theme-2" style="white-space: nowrap">Restaurant Manager</h1>
        <p class="mb-5" style="font-size: 0.8em">
          contact us
          <a class="text text-theme-6">63070132@it.kmitl.ac.th</a>
        </p>
        <div class="input-group mb-4" style="width: 60%">
          <span
            class="input-group-text px-4 py-3 bg-light text-theme-1"
            :class="{ 'border-danger text-danger': error }"
          >
            <i class="fas fa-user"></i>
          </span>
          <input
            class="form-control ps-4 py-3"
            :class="{ 'is-invalid text-danger': error }"
            type="text"
            placeholder="Username"
            v-model="username"
            @focus="error = false"
            ref="usernameInput"
          />
        </div>
        <div class="input-group mb-4" style="width: 60%">
          <span
            class="input-group-text px-4 py-3 bg-light text-theme-1"
            :class="{ 'border-danger text-danger': error }"
          >
            <i class="fas fa-lock"></i>
          </span>
          <input
            class="form-control ps-4 py-3"
            :class="{ 'is-invalid text-danger': error }"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
            @focus="error = false"
            ref="passwordInput"
          />
        </div>
        <div
          class="mb-5 text-muted clickable ps-2"
          style="font-size: .9em; width: 60%"
          @click="showPassword = !showPassword"
        >
          <span v-show="showPassword">
            <i class="fas fa-eye-slash me-1"></i>
          </span>
          <span v-show="!showPassword">
            <i class="fas fa-eye me-1"></i>
          </span>
          {{ showPassword ? 'Hide' : 'Show' }} password
        </div>
        <div class="input-group mb-5 d-flex justify-content-center">
          <input
            class="btn text-light px-5 py-2 fw-bold bg-theme-2"
            type="submit"
            value="LOGIN"
            @click="login()"
          />
        </div>
      </div>
      <div
        class="col-5 p-5 shadow d-flex flex-column justify-content-center bg-theme-2"
        style="
          border-radius: 0 1.5rem 1.5rem 0;
          padding: 12rem 8rem;
        "
      >
        <h3 class="display-5 text-light mb-2">Describe</h3>
        <p class="text-light mb-4" style="opacity: 0.6">
          A web-site for restaurant manager, publish as a non-public web-site
          only the employee in company can login and access this site.
        </p>
        <p class="text-light" style="opacity: 0.8">since 2022 @it.kmitl</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      error: false,
      username: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    login() {
      if (this.username === "" || this.password === "") {
        this.error = true;
        return;
      }

      axios
        .post("http://localhost:3000/manager/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          var token = res.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          this.$router.push("/manager/tables");
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
  },
  mounted() {
    this.$refs["container"].style.height = window.innerHeight + "px";

    window.onresize = () => {
      this.$refs["container"].style.height = window.innerHeight + "px";
    };
  },
};
</script>