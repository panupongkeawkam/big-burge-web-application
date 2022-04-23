<template>
  <div ref="container" class="w-100">
    <div class="row rounded h-100 px-5 py-4">
      <div class="col px-3">
        <div
          class="col-12 m-0 shadow d-flex"
          style="background: hsl(0, 0%, 96%); border-radius: 1rem"
        >
          <div
            class="d-flex flex-column align-items-center pt-3 text-light bg-theme-2"
            style="
              width: 6% !important;
              font-size: 1.8em;
              border-radius: 1rem 0 0 1rem;
            "
          >
            <div class="my-3 clickable">
              <i class="fas fa-table-cells text-warning"></i>
            </div>
            <div class="my-3 clickable">
              <router-link to="/manager/menus">
                <i class="fas fa-burger text-light"></i>
              </router-link>
            </div>
            <div class="my-3 clickable">
              <i class="fas fa-user"></i>
            </div>
          </div>
          <div class="col py-3 px-4" ref="mainCanvas">
            <div
              class="col-12 pb-5 d-flex align-items-center justify-content-between"
              ref="titleBar"
              style="height: 10%"
            >
              <h1 class="fw-bold text-theme-2">Tables</h1>
              <div class="d-flex">
                <div
                  class="d-flex ps-2 pe-3 clickable"
                  @click="filter = filter === 'created' ? '' : 'created'"
                >
                  <div
                    class="rounded me-2"
                    style="
                      height: 24px;
                      width: 24px;
                      border: 3px solid #39c8ef;
                      padding: 2px;
                    "
                  >
                    <div
                      class="w-100 h-100 rounded"
                      style="background: #39c8ef"
                      v-show="filter === 'created'"
                    ></div>
                  </div>
                  <div class="fw-bold text-muted">Check In</div>
                </div>
                <div
                  class="d-flex ps-2 pe-3 clickable"
                  @click="filter = filter === 'waiting' ? '' : 'waiting'"
                >
                  <div
                    class="rounded me-2"
                    style="
                      height: 24px;
                      width: 24px;
                      border: 3px solid #fad945;
                      padding: 2px;
                    "
                  >
                    <div
                      class="w-100 h-100 rounded"
                      style="background: #fad945"
                      v-show="filter === 'waiting'"
                    ></div>
                  </div>
                  <div class="fw-bold text-muted">Waiting</div>
                </div>
                <div
                  class="d-flex ps-2 pe-3 clickable"
                  @click="filter = filter === 'served' ? '' : 'served'"
                >
                  <div
                    class="rounded me-2"
                    style="
                      height: 24px;
                      width: 24px;
                      border: 3px solid #31d475;
                      padding: 2px;
                    "
                  >
                    <div
                      class="w-100 h-100 rounded"
                      style="background: #31d475"
                      v-show="filter === 'served'"
                    ></div>
                  </div>
                  <div class="fw-bold text-muted">Served</div>
                </div>
                <div
                  class="d-flex ps-2 pe-3 clickable"
                  @click="filter = filter === 'billing' ? '' : 'billing'"
                >
                  <div
                    class="rounded me-2"
                    style="
                      height: 24px;
                      width: 24px;
                      border: 3px solid #fc8845;
                      padding: 2px;
                    "
                  >
                    <div
                      class="w-100 h-100 rounded"
                      style="background: #fc8845"
                      v-show="filter === 'billing'"
                    ></div>
                  </div>
                  <div class="fw-bold text-muted">Billing</div>
                </div>
              </div>
            </div>
            <div
              class="col-12 d-flex flex-wrap"
              style="overflow: auto; height: 90%"
              ref="tablesOverview"
            >
              <div
                class="shadow-sm mb-3 me-3 p-4 d-flex flex-column justify-content-between position-relative"
                style="width: 300px;
                  height: 300px;
                  border-radius: 1rem;
                  background: white;
                "
                :style="{ filter: `opacity(${i == 5 ? '.2' : '1'})` }"
                v-for="i in 15"
                @click="
                  showInfo();
                  displayOrder = i;
                "
                :class="{
                  clickable: i !== 5,
                  'border border-3 border-warning': displayOrder === i,
                }"
                :key="i"
              >
                <div class="d-flex justify-content-between">
                  <span class="fw-bold fs-4 text-muted">
                    {{
                    (i + 100).toString().slice(1)
                    }}
                  </span>
                  <div
                    class="bg-danger px-4 mb-2 d-flex justify-content-center align-items-center fw-bold text-white rounded-pill"
                  >Q1</div>
                  <span>
                    <i class="fas fa-clipboard-list" style="font-size: 2em; color: #39c8ef"></i>
                    <!-- <i class="fas fa-clock" style="font-size: 2em; color: #fad945"></i> -->
                    <!-- <i class="fas fa-utensils" style="font-size: 2em; color: #31d475"></i> -->
                    <!-- <i class="fas fa-file-invoice-dollar" style="font-size: 2em; color: #fc8845"></i> -->
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <span class="text-muted fw-bold mb-1" style="opacity: 0.5">Steve Rogers</span>
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
          <div class="col-12 p-4 d-flex justify-content-between" style="height: 10%">
            <span
              class="pe-4"
              @click="
                hideInfo();
                displayOrder = -1;
              "
            >
              <i class="fas fa-xmark text-muted clickable" style="font-size: 1.6em"></i>
            </span>
            <h2 class="fw-bold text-theme-2">Table 1</h2>
            <span>
              <i class="fas fa-xmark text-muted clickable" style="font-size: 1.6em; opacity: 0"></i>
            </span>
          </div>
          <div
            class="col-12 px-4 pb-5 d-flex flex-column justify-content-between"
            style="height: 90%"
            ref="tableInfoBody"
          >
            <div class="d-flex align-items-center pb-4" ref="tableInfoStatus">
              <span>
                <i class="fas fa-clipboard-list me-2" style="font-size: 1.5em; color: #39c8ef"></i>
                <span class="fw-bold text-muted">Created</span>
              </span>
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
            </div>-->
            <div class="pe-3" style="height: 400px; overflow: auto" ref="tableInfoItem">
              <div
                class="rounded p-3 bg-light mb-2 shadow-sm d-flex"
                v-for="i in 20"
                :key="'item' + i"
              >
                <div class="col-11 text-muted">Menu Name</div>
                <div class="col-1 fw-bold text-muted">x2</div>
              </div>
            </div>
            <section ref="tableInfoSummary">
              <div class="d-flex pe-4 py-3 flex-wrap">
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 me-2 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-muted" style="font-size: 0.8em">Title</span>
                  <span class="fs-5 text-theme-2">Value</span>
                </div>
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-muted" style="font-size: 0.8em">Title</span>
                  <span class="fs-5 text-theme-2">Value</span>
                </div>
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 me-2 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-muted" style="font-size: 0.8em">Title</span>
                  <span class="fs-3 text-theme-2">Value</span>
                </div>
                <div
                  class="d-flex flex-column px-4 py-3 bg-theme-4 mb-2"
                  style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                >
                  <span class="fw-bold text-muted" style="font-size: 0.8em">Title</span>
                  <span class="fs-3 text-theme-2">Value</span>
                </div>
              </div>
              <div class="d-flex justify-content-end pe-4">
                <button class="btn btn-lg btn-outline-warning me-2 fw-bold border-2">Serve</button>
                <!-- <button class="btn btn-lg btn-outline-info me-2 fw-bold border-2">
                  Finish
                </button>-->
                <button class="btn btn-lg btn-outline-danger border-2 fw-bold">Cancel Order</button>
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
      displayOrder: -1,
      filter: "",
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
    var screenHeight = screen.height > 1080 ? screen.height : 1080;
    this.$refs["container"].style.height = screenHeight + "px";
    this.$refs["mainCanvas"].style.height = `calc(${screenHeight}px - 3rem)`;

    this.$refs["container"].style.transformOrigin = "top";
    this.$refs["container"].style.minWidth = screen.width * 0.7 + "px";
    this.$refs["tableInfo"].style.display = "none";
    this.$refs["tableInfo"].style.overflow = "hidden";

    this.showInfo();

    var tableInfoBodyHeight = this.$refs["tableInfoBody"].clientHeight;
    var tableInfoStatusHeight = this.$refs["tableInfoStatus"].clientHeight;
    var tableInfoSummaryHeight = this.$refs["tableInfoSummary"].clientHeight;

    this.$refs["tableInfo"].style.display = "none";

    this.$refs["tableInfoItem"].style.height = `calc(${
      tableInfoBodyHeight - tableInfoStatusHeight - tableInfoSummaryHeight
    }px + 5.5rem)`;

    if (screen.height > 1080) {
      return;
    }

    var currentHeight = window.innerHeight;
    this.$refs["container"].style.transform = `scale(${
      currentHeight / screenHeight
    })`;

    window.onresize = () => {
      currentHeight = window.innerHeight;
      this.$refs["container"].style.transform = `scale(${
        currentHeight / screenHeight
      })`;
    };
  },
};
</script>