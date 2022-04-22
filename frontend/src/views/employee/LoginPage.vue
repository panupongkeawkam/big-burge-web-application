<template>
  <div
    ref="container"
    class="container d-flex flex-column justify-content-center"
  >
    <div class="row" style="height: 85% !important">
      <div
        class="
          col-7
          d-flex
          flex-column
          justify-content-center
          align-items-center
          shadow
          bg-theme-5
        "
        style="
          border-radius: 1.5rem 0 0 1.5rem;
        "
      >
        <h1 class="fw-bold mb-2 text-theme-2" style="white-space: nowrap">
          Restaurant Manager
        </h1>
        <p class="mb-5" style="font-size: 0.8em">
          contact us
          <a class="text text-theme-6">somemail@gmail.co.th</a>
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
            :class="{ 'border-danger text-danger': error }"
            type="text"
            placeholder="Username"
            v-model="username"
            onfocus="this.style.border = '1px solid #ccd4dc'"
            @focus="error = false"
            required
          />
        </div>
        <div class="input-group mb-5" style="width: 60%">
          <span
            class="input-group-text px-4 py-3 bg-light text-theme-1"
            :class="{ 'border-danger text-danger': error }"
          >
            <i class="fas fa-lock"></i>
          </span>
          <input
            class="form-control ps-4 py-3"
            :class="{ 'border-danger text-danger': error }"
            type="password"
            placeholder="Password"
            v-model="password"
            onfocus="this.style.border = '1px solid #ccd4dc'"
            @focus="error = false"
            required
          />
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
        <h3 class="display-5 text-light mb-2">Three Layers Pill</h3>
        <p class="text-light mb-4" style="opacity: 0.6">
          A web-site for restaurant manager, publish as a non-public web-site
          only the employee in company can login and access this site.
        </p>
        <p class="text-light" style="opacity: 0.8">since 2022</p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"

export default {
  data() {
    return {
      error: false,
    };
  },
  methods: {
    login() {
      window.location.href = "/manager/tables";
    },
  },
  mounted() {
    this.$refs['container'].style.height = window.innerHeight + "px";

    window.onresize = () => {
      this.$refs['container'].style.height = window.innerHeight + "px";
    };
  },
};
</script>