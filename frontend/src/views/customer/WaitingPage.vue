<template>
  <div
    class="container bg-theme-3 d-flex flex-column justify-content-center align-items-center"
    ref="container"
  >
    <img src="../../assets/svgs/cooking.svg" style="width: 50%" alt />
    <span class="fs-1 fw-bold text-light mt-5 mb-3">Cooking{{ dot }}</span>
    <span class="text-center" style="color: hsl(0, 0%, 100%, 60%)">
      Waiting until all menu is served then
      <br />billing will available
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dot: "",
    };
  },
  methods: {
    dotAnimation() {
      setInterval(() => {
        if (this.dot.length === 3) {
          this.dot = "";
          return;
        }
        this.dot += ".";
      }, 500);
    },
  },
  mounted() {
    this.$refs.container.style.height = window.outerHeight + "px";
    this.dotAnimation();

    window.onresize = () => {
      this.$refs.container.style.height = window.innerHeight + "px";
    };
  },
};
</script>