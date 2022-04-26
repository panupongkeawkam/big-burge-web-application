<template>
  <div
    class="container bg-theme-3 d-flex flex-column justify-content-center align-items-center"
    ref="container"
  >
    <img src="../../assets/svgs/completed.svg" style="width: 50%" alt />
    <span class="fs-1 fw-bold text-light mt-5 mb-3">Thank you</span>
    <span
      class="text-center mb-4"
      style="color: hsl(0, 0%, 100%, 60%)"
    >Bill pay complete, thank for using us</span>
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