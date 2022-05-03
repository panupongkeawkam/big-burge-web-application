<template>
  <div
    class="container bg-theme-3 d-flex flex-column justify-content-center align-items-center"
    ref="container"
  >
    <img src="../../assets/svgs/cooking.svg" style="width: 50%" alt />
    <div
      class="col-12 mt-3 d-flex flex-column align-items-center position-relative mt-4 mb-4"
      style="border-radius: 1rem"
    >
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span class="fw-bold text-light fs-1">Cooking</span>
    </div>
    <span class="text-center" style="color: hsl(0, 0%, 100%, 60%)">
      Waiting until all menu is served then
      <br />billing will available
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$refs.container.style.height = window.outerHeight + "px";

    window.onresize = () => {
      this.$refs.container.style.height = window.innerHeight + "px";
    };
  },
};
</script>