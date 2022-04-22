<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App"
};
</script>

<style>
@import url("assets/css/style.css");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

#app {
  font-family: "Inter", sans-serif;
  background: hsl(50, 10%, 95%);
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
