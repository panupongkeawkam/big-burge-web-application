<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
@import url("assets/css/style.css");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

#app {
  font-family: "Inter", sans-serif;
  background: hsl(50, 10%, 95%);
  padding: 0;
  transform-origin: top left;
}
</style>
