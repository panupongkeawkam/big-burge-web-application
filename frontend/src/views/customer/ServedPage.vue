<template>
  <div
    class="container bg-theme-3 d-flex flex-column justify-content-center align-items-center"
    ref="container"
  >
    <img src="../../assets/svgs/eating.svg" style="width: 50%" alt />
    <span class="fs-1 fw-bold text-light mt-5 mb-3">Enjoy Your Meal</span>
    <span
      class="text-center mb-4"
      style="color: hsl(0, 0%, 100%, 60%)"
    >You can call to check bill where ever you need</span>
    <button
      class="btn btn-outline-light border-2 fs-5 py-3 fw-bold w-75"
      type="button"
    >Check Bill</button>
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