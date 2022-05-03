<template>
  <div class="w-100 bg-theme-3">
    <div
      class="container bg-theme-3 d-flex flex-column justify-content-center align-items-center"
      ref="container"
    >
      <img src="../assets/svgs/404-not-found.svg" class="w-50" alt />
      <span
        class="fs-1 fw-bold text-light mt-5 mb-3 text-center px-5"
      >Ops!, You looking for the wrong way</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$refs.container.style.height = window.outerHeight + "px";

    window.onresize = () => {
      this.$refs.container.style.height = window.innerHeight + "px";
    };
  },
};
</script>