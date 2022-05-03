<template>
  <div id="app">
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :account="account" />
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "App",
  data() {
    return {
      account: null,
    };
  },
  methods: {
    async onAuthChange() {
      axios
        .get("http://localhost:3000/manager/account")
        .then((res) => {
          this.account = res.data.account;
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    },
  },
  beforeCreate() {
    document.body.style.background = "#3aafa9";
  },
  async created() {
    await this.onAuthChange();
  },
};
</script>

<style scoped>
@import url("assets/css/style.css");
@import url("assets/css/loading.css");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Kanit:wght@400&family=Plus+Jakarta+Sans:wght@400;700&display=swap");

#app {
  font-family: "Plus Jakarta Sans", sans-serif, "Kanit", sans-serif;
  background: hsl(50, 10%, 95%);
  padding: 0;
}
</style>
