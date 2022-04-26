<template>
  <div>
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
                <router-link to="/manager/profile">
                  <i class="fas fa-user text-light"></i>
                </router-link>
              </div>
            </div>
            <div class="col py-3 px-4" ref="mainCanvas">
              <div
                class="col-12 pb-5 d-flex align-items-center justify-content-between"
                ref="titleBar"
                style="height: 10%"
              >
                <div class="fw-bold text-theme-2 fs-1">Tables</div>
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
                      border: 2px solid #39c8ef;
                      padding: 2px;
                    "
                    >
                      <div
                        class="w-100 h-100"
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
                      border: 2px solid #fad945;
                      padding: 2px;
                    "
                    >
                      <div
                        class="w-100 h-100"
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
                      border: 2px solid #31d475;
                      padding: 2px;
                    "
                    >
                      <div
                        class="w-100 h-100"
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
                      border: 2px solid #fc8845;
                      padding: 2px;
                    "
                    >
                      <div
                        class="w-100 h-100"
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
                  :style="{ filter: `opacity(${i == 5 ? '.3' : '1'}) brightness(${i == 5 ? '80%' : '100%'})` }"
                  v-for="i in 15"
                  @click="
                  showInfo();
                  displayOrder = i;
                "
                  :class="{
                  clickable: i !== 5,
                  'selected-table': displayOrder === i,
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
              <div ref="tableInfoStatus">
                <!-- <div class="d-flex align-items-center pb-4">
                <span>
                  <i class="fas fa-clipboard-list me-2" style="font-size: 1.5em; color: #39c8ef"></i>
                  <span class="fw-bold text-muted">Created</span>
                </span>
                </div>-->
                <!-- <div class="d-flex align-items-center pb-4">
                <span>
                  <i class="fas fa-clock me-2" style="font-size: 1.5em; color: #fad945"></i>
                  <span class="fw-bold text-muted">Waiting</span>
                </span>
                </div>-->
                <!-- <div class="d-flex align-items-center pb-4">
                <span>
                  <i
                    class="fas fa-file-invoice-dollar me-2"
                    style="font-size: 1.5em; color: #fc8845"
                  ></i>
                  <span class="fw-bold text-muted">Billing</span>
                </span>
                </div>-->
                <div class="d-flex align-items-center pb-4">
                  <span>
                    <i class="fas fa-utensils me-2" style="font-size: 1.5em; color: #31d475"></i>
                    <span class="fw-bold text-muted">Served</span>
                  </span>
                </div>
              </div>
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
                    <span class="fw-bold text-muted" style="font-size: 0.8em">Customer Name</span>
                    <span class="fs-5 text-theme-2">-</span>
                  </div>
                  <div
                    class="d-flex flex-column px-4 py-3 bg-theme-4 mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span class="fw-bold text-muted" style="font-size: 0.8em">Check In Time</span>
                    <span class="fs-5 text-theme-2">Today 12:50:12</span>
                  </div>
                  <div
                    class="d-flex flex-column px-4 py-3 bg-theme-4 me-2 mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span class="fw-bold text-muted" style="font-size: 0.8em">Item Amount</span>
                    <span class="fs-3 text-theme-2">4</span>
                  </div>
                  <div
                    class="d-flex flex-column px-4 py-3 bg-theme-4 mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span class="fw-bold text-muted" style="font-size: 0.8em">Total</span>
                    <span class="fs-3 text-theme-2">1400.00฿</span>
                  </div>
                </div>
                <div class="d-flex justify-content-end pe-4">
                  <button
                    class="btn btn-lg text-light btn-info me-2 fw-bold border-2"
                    v-if="true"
                  >Finish</button>
                  <button
                    class="btn btn-lg text-light btn-warning me-2 fw-bold border-2"
                    v-if="true"
                  >Serve</button>
                  <button
                    class="btn btn-lg btn-danger text-light border-2 fw-bold"
                    v-if="true"
                    data-bs-toggle="modal"
                    data-bs-target="#cancelOrderModal"
                  >Cancel Order</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="cancelOrderModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-muted">Cancel Order</h5>
          </div>
          <div class="modal-body">
            Are you sure to cancel order for 'Table 1'?
            <br />
            <span class="text-danger" style="font-size: .9em">Warning: This change can't turned back</span>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary border-2 fw-bold"
              data-bs-dismiss="modal"
            >Cancel</button>
            <button
              class="btn btn-danger fw-bold text-light border-2"
              data-bs-dismiss="modal"
              @click="logout()"
            >Confirm</button>
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
      queue: 1,
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
        console.log(res)
        this.tables = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    var currentHeight = window.innerHeight;
    this.$refs["container"].style.height = currentHeight + "px";
    this.$refs["mainCanvas"].style.height = `calc(${currentHeight}px - 3rem)`;

    this.$refs["tableInfo"].style.display = "none";
    this.$refs["tableInfo"].style.overflow = "hidden";

    this.showInfo();

    var tableInfoBodyHeight = this.$refs["tableInfoBody"].clientHeight;
    var tableInfoStatusHeight = this.$refs["tableInfoStatus"].clientHeight;
    var tableInfoSummaryHeight = this.$refs["tableInfoSummary"].clientHeight;

    this.$refs["tableInfo"].style.display = "none";

    this.$refs["tableInfoItem"].style.height = `calc(${
      tableInfoBodyHeight - tableInfoStatusHeight - tableInfoSummaryHeight
    }px + 1.5rem)`;

    window.onresize = () => {
      currentHeight = window.innerHeight;
      this.$refs["container"].style.height = currentHeight + "px";
      this.$refs["mainCanvas"].style.height = `calc(${currentHeight}px - 3rem)`;
    };
  },
};
</script>