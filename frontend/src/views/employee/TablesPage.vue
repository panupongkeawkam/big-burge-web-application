<template>
  <div ref="container" class="container-fluid">
    <div class="row rounded h-100 px-5 py-4">
      <div class="col px-3">
        <div
          class="col-12 m-0 shadow d-flex"
          style="background: hsl(0, 0%, 96%); border-radius: 1rem"
        >
          <div
            class="
              d-flex
              flex-column
              align-items-center
              pt-3
              text-light
              bg-theme-2
            "
            style="
              width: 6% !important;
              font-size: 1.6em;
              border-radius: 1rem 0 0 1rem;
            "
          >
            <div class="my-3 clickable">
              <i class="fas fa-table-cells text-theme-6"></i>
            </div>
            <div class="my-3 clickable">
              <i class="fas fa-burger"></i>
            </div>
            <div class="my-3 clickable">
              <i class="fas fa-user"></i>
            </div>
            <div class="my-3 clickable">
              <i
                class="fas fa-arrow-right-from-bracket"
                style="transform: scale(-1)"
              ></i>
            </div>
          </div>
          <div class="col py-3 px-4" ref="mainCanvas">
            <div class="col-12 pb-5" ref="titleBar" style="height: 10%">
              <h1 class="fw-bold text-theme-2">Tables</h1>
            </div>
            <div
              class="col-12 d-flex flex-wrap"
              style="overflow: auto; height: 90%"
              ref="tablesOverview"
            >
              <div
                class="
                  shadow-sm
                  mb-3
                  me-3
                  p-4
                  d-flex
                  flex-column
                  justify-content-between
                "
                :class="{ clickable: i !== 5 }"
                style="
                  width: 300px;
                  height: 300px;
                  border-radius: 1rem;
                  background: white;
                "
                :style="{ filter: `opacity(${i == 5 ? '.2' : '1'})` }"
                v-for="i in 15"
                @click="showInfo()"
                :key="i"
              >
                <div class="d-flex justify-content-between">
                  <span class="fw-bold fs-4 text-muted">{{
                    (i + 100).toString().slice(1)
                  }}</span>
                  <span>
                    <!-- <i class="fas fa-clipboard-list" style="font-size: 2em; color: #39c8ef"></i> -->
                    <!-- <i class="fas fa-clock" style="font-size: 2em; color: #fad945"></i> -->
                    <!-- <i class="fas fa-utensils" style="font-size: 2em; color: #31d475"></i> -->
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <span class="text-muted fw-bold">4 Item</span>
                  <span class="text-muted fw-bold fs-5">500.00฿</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref="tableInfo"
        class="col-4 p-0 shadow-lg"
        style="background: hsl(0, 0%, 96%); border-radius: 1rem"
      >
        <div class="col-12 h-100 w-100 m-0">
          <div
            class="col-12 p-4 d-flex justify-content-between"
            style="height: 10%"
          >
            <span class="pe-4" @click="hideInfo()">
              <i
                class="fas fa-xmark text-muted clickable"
                style="font-size: 1.6em"
              ></i>
            </span>
            <h2 class="fw-bold">Table 1</h2>
            <span>
              <i
                class="fas fa-xmark text-muted clickable"
                style="font-size: 1.6em; opacity: 0"
              ></i>
            </span>
          </div>
          <div
            class="col-12 px-4 pb-5 d-flex flex-column justify-content-between"
            style="height: 90%"
          >
            <div class="d-flex align-items-center pb-4 bg-danger" ref="tableInfoStatus">
              <span>
                <i
                  class="fas fa-clipboard-list me-2"
                  style="font-size: 1.5em; color: #39c8ef"
                ></i>
                <span class="fw-bold text-muted">Created</span></span
              >
            </div>
            <!-- <div class="d-flex align-items-center">
                  <span>
                    <i
                      class="fas fa-clock me-2"
                      style="font-size: 1.5em; color: #fad945"
                    ></i>
                    <span class="fw-bold text-muted">Waiting</span></span
                  >
                </div>
                <div class="d-flex align-items-center">
                  <span>
                    <i
                      class="fas fa-file-invoice-dollar me-2"
                      style="font-size: 1.5em; color: #fc8845"
                    ></i>
                    <span class="fw-bold text-muted">Billing</span></span
                  >
                </div>
                <div class="d-flex align-items-center">
                  <span>
                    <i
                      class="fas fa-utensils me-2"
                      style="font-size: 1.5em; color: #31d475"
                    ></i>
                    <span class="fw-bold text-muted">Served</span></span
                  >
                </div> -->
            <div class="pe-3" style="height: 400px; overflow: auto">
              <div
                class="
                  rounded
                  p-3
                  bg-light
                  mb-2
                  d-flex
                  justify-content-between
                  shadow-sm
                "
                v-for="i in 20"
                :key="'item' + i"
              >
                <span>Menu Name</span>
                <span>x1</span>
              </div>
            </div>
            <section ref="tableInfoSummary" class="bg-primary">
              <div class="d-flex pe-4 py-3 flex-wrap">
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 me-2 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-theme-2" style="font-size: 0.8em"
                    >Title</span
                  >
                  <span class="fs-5">Value</span>
                </div>
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-theme-2" style="font-size: 0.8em"
                    >Title</span
                  >
                  <span class="fs-5">Value</span>
                </div>
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 me-2 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-theme-2" style="font-size: 0.8em"
                    >Title</span
                  >
                  <span class="fs-5">Value</span>
                </div>
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-theme-2" style="font-size: 0.8em"
                    >Title</span
                  >
                  <span class="fs-5">Value</span>
                </div>
              </div>
              <div class="d-flex justify-content-end pe-4">
                <button class="btn btn-lg btn-outline-warning me-2">
                  Serve
                </button>
                <button class="btn btn-lg btn-outline-danger">
                  Cancel Order
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/style.css";
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showTableInfo: false,
      tables: [],
      menus: [],
    };
  },
  methods: {
    showInfo() {
      var el = this.$refs["tableInfo"];
      el.style.animation = "show .3s";
      el.style.width = "33.33%";
      el.style.display = "initial";
    },
    hideInfo() {
      var el = this.$refs["tableInfo"];
      el.style.animation = "hide .3s";
      setTimeout(() => {
        el.style.display = "none";
        el.style.width = "0%";
      }, 300);
    },
  },
  created() {
    axios
      .get("http://localhost:3000/tables")
      .then((res) => {
        this.tables = res.data.tables;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/menus")
      .then((res) => {
        this.menus = res.data.menus;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    var innerHeight = window.innerHeight;
    this.$refs["container"].style.height = innerHeight + "px";
    this.$refs["tableInfo"].style.display = "none";
    this.$refs["tableInfo"].style.overflow = "hidden";

    this.$refs["mainCanvas"].style.height = `calc(${innerHeight}px - 3rem)`;
    this.showInfo();

    console.log(this.$refs["tableInfoStatus"].clientHeight)
    console.log(this.$refs["tableInfoSummary"].clientHeight)

    window.onresize = () => {
      innerHeight = window.innerHeight;
      this.$refs["container"].style.height = innerHeight + "px";
      this.$refs["mainCanvas"].style.height = `calc(${innerHeight}px - 3rem)`;
    };
  },
};
</script>