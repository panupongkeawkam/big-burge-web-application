<template>
  <div class="container d-flex justify-content-center align-items-center" ref="container">
    <h1>This is billing page</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$refs.container.style.minHeight = window.outerHeight + "px";

    window.onresize = () => {
      this.$refs.container.style.minHeight = window.innerHeight + "px";
    };
  },
};
</script>