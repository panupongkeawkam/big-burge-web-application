<template>
  <div class="container bg-theme-3 d-flex flex-column justify-content-end" ref="container">
    <div
      class="row text-center d-flex flex-column justify-content-center align-items-center mb-5 mt-4"
    >
      <img class="mb-4" src="../../assets/svgs/ice-cream-guy.svg" style="width: 50%" alt />
      <span class="fs-1 fw-bold text-light mb-3">Welcome</span>
      <span class="mb-4" style="color: hsl(0, 0%, 100%, 60%)">
        Press
        <u>Get Started</u> to continue order menu
        <br />or get discount with
        <u>Member Login</u>
      </span>
    </div>
    <div class="row d-flex justify-content-center px-2">
      <div class="col-xxl-6 col-12">
        <button
          @click="guest()"
          class="btn btn-outline-light border-2 fs-5 py-3 fw-bold w-100"
          type="button"
        >Get Started</button>
        <div class="d-flex my-2">
          <hr style="width: 100%; color: white" />
          <span
            class="text-center text-light px-2 d-flex align-items-center"
            style="width: auto; font-size: .75em; white-space: nowrap;"
          >
            OR
            BENEFIT WITH
          </span>
          <hr style="width: 100%; color: white" />
        </div>
        <button
          class="btn btn-warning fs-5 py-3 text-light fw-bold w-100 position-relative"
          :class="{'bg-light border-light text-dark': showMemberLogin}"
          @click="toggleMemberLogin()"
          ref="memberLoginButton"
        >
          <i class="fas fa-crown me-2"></i>
          Member Login
        </button>
        <div
          class="p-3 rounded-bottom pb-4 mb-4 bg-light"
          style="font-size: .8em; transform-origin: top"
          ref="memberLoginForm"
        >
          <div class="mb-3">
            <input
              type="text"
              class="form-control py-2 mb-3"
              placeholder="Username"
              v-model="username"
              :class="{'border border-danger': error}"
            />
          </div>
          <div class="mb-3">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control py-2"
              placeholder="Password"
              v-model="password"
              :class="{'border border-danger': error}"
            />
          </div>
          <div
            class="mb-3 text-muted clickable"
            style="font-size: .9em"
            @click="showPassword = !showPassword"
          >
            <span v-show="showPassword">
              <i class="fas fa-eye-slash"></i>
            </span>
            <span v-show="!showPassword">
              <i class="fas fa-eye"></i>
            </span>
            {{ showPassword ? 'Hide' : 'Show' }} password
          </div>
          <!-- <div class="form-text text-danger mb-3" v-if="error">*User identifier invalid.</div> -->
          <div class="col-12 d-flex justify-content-center">
            <button
              type="submit"
              class="btn border px-3 fw-bold text-light bg-theme-1"
              @click="login()"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableId: "",
      username: "",
      password: "",
      showMemberLogin: false,
      showPassword: false,
      error: false,
    };
  },
  methods: {
    toggleMemberLogin() {
      this.showMemberLogin = !this.showMemberLogin;
      if (this.showMemberLogin) {
        this.$refs.memberLoginButton.style.borderRadius = ".25em .25em 0 0";
        this.$refs.memberLoginForm.style.animation = "slide-down .3s";
        this.$refs.memberLoginForm.style.visibility = "visible";
        setTimeout(() => {
          window.scrollTo(0, 3000);
        }, 300);
      } else if (!this.showMemberLogin) {
        this.$refs.memberLoginButton.style.borderRadius = ".25em";
        this.$refs.memberLoginForm.style.animation = "slide-up .3s";
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.$refs.memberLoginForm.style.visibility = "hidden";
        }, 300);
      }
    },
    async guest() {
      axios
        .post(`http://localhost:3000/table/${this.tableId}/guest`)
        .then(() => {
          this.$router.push(`/table/${this.tableId}/menu`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async login() {
      axios
        .post(`http://localhost:3000/table/${this.tableId}/login`, {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push(`/table/${this.tableId}/menu`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.tableId = this.$route.params.tableId;
  },
  mounted() {
    document.body.style.overflow = "hidden";
    this.$refs.container.style.minHeight = window.innerHeight + "px";
    this.$refs.memberLoginForm.style.visibility = "hidden";

    window.onresize = () => {
      this.showMemberLogin = false;
      this.$refs.container.style.minHeight = window.innerHeight + "px";
    };

    if (this.$route.query.login === "required") {
      this.error = true;
      this.toggleMemberLogin();
    }
  },
};
</script>