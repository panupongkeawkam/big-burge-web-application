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
              width: 7% !important;
              font-size: 1.8em;
              border-radius: 1rem 0 0 1rem;
            "
            >
              <div class="my-3 clickable">
                <span class="d-flex flex-column justify-content-center align-items-center">
                  <i class="fas fa-table-cells text-warning"></i>
                  <span
                    class="mt-2 text-light"
                    style="font-size: 12px !important; opacity: .75"
                  >TABLES</span>
                </span>
              </div>
              <div class="my-3 clickable" @click="clearAllInterval()">
                <router-link
                  class="d-flex flex-column justify-content-center align-items-center text-decoration-none"
                  to="/manager/menus"
                >
                  <i class="fas fa-burger text-light"></i>
                  <span
                    class="mt-2 text-light"
                    style="font-size: 12px !important; opacity: .75"
                  >MENUS</span>
                </router-link>
              </div>
              <div class="my-3 clickable" @click="clearAllInterval()">
                <router-link
                  class="d-flex flex-column justify-content-center align-items-center text-decoration-none"
                  to="/manager/profile"
                >
                  <i class="fas fa-user text-light"></i>
                  <span
                    class="mt-2 text-light"
                    style="font-size: 12px !important; opacity: .75"
                  >PROFILE</span>
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
                    @click="filter = filter === 'created' ? '' : 'created'; hideInfo()"
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
                    <div class="fw-bold text-muted">Check-in</div>
                  </div>
                  <div
                    class="d-flex ps-2 pe-3 clickable"
                    @click="filter = filter === 'pending' ? '' : 'pending'; hideInfo()"
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
                        v-show="filter === 'pending'"
                      ></div>
                    </div>
                    <div class="fw-bold text-muted">Waiting</div>
                  </div>
                  <div
                    class="d-flex ps-2 pe-3 clickable"
                    @click="filter = filter === 'served' ? '' : 'served'; hideInfo()"
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
                    @click="filter = filter === 'billing' ? '' : 'billing'; hideInfo()"
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
                class="col-12 d-flex flex-wrap align-content-start"
                style="overflow: auto; height: 90%"
                ref="tablesOverview"
              >
                <div
                  v-if="filteredTables.length === 0"
                  class="w-100 h-100 d-flex justify-content-center align-items-center fs-2 fw-bold text-muted"
                  style="opacity: .5"
                >No Table to Show</div>
                <div
                  class="shadow-sm mb-3 me-3 p-4 d-flex flex-column justify-content-between position-relative"
                  style="width: 300px;
                  height: 300px;
                  border-radius: 1rem;
                  background: white;
                "
                  :style="{ filter: `opacity(${table.table_status === 'ready' ? '.3' : '1'}) brightness(${table.table_status === 'ready' ? '80%' : '100%'}) grayscale(${table.table_status === 'ready' ? '100%' : '0%'})` }"
                  v-for="(table, index) in filteredTables"
                  @click="
                  showInfo(table);
                  displayOrderIndex = index;
                "
                  :class="{
                  clickable: table.table_status === 'not_ready',
                  'selected-table': displayOrderIndex === index && table.table_status === 'not_ready'
                }"
                  :key="'table' + table.table_id"
                >
                  <div class="d-flex justify-content-between">
                    <span class="fw-bold fs-4 text-theme-3">
                      {{
                      (table.table_id + 100).toString().slice(1)
                      }}
                    </span>
                    <div
                      v-if="table.queue"
                      class="bg-danger px-4 mb-2 d-flex justify-content-center align-items-center fw-bold text-white rounded-pill"
                    >Q{{ table.queue }}</div>
                    <span v-show="table.status === 'created'">
                      <i class="fas fa-clipboard-list" style="font-size: 2em; color: #39c8ef"></i>
                    </span>
                    <span v-show="table.status === 'pending'">
                      <i class="fas fa-clock" style="font-size: 2em; color: #fad945"></i>
                    </span>
                    <span v-show="table.status === 'served'">
                      <i class="fas fa-utensils" style="font-size: 2em; color: #31d475"></i>
                    </span>
                    <span v-show="table.status === 'billing'">
                      <i class="fas fa-file-invoice-dollar" style="font-size: 2em; color: #fc8845"></i>
                    </span>
                  </div>
                  <div class="d-flex flex-column fs-5">
                    <span
                      class="text-muted fw-bold"
                      style="opacity: 0.5"
                      v-if="table.table_status !== 'ready'"
                    >{{ table.full_name || '' }}</span>
                    <span
                      class="text-muted fw-bold"
                      style="opacity: 0.75"
                      v-if="table.table_status !== 'ready'"
                    >{{ table.quantity_item + ' Item' }}</span>
                    <span
                      class="fw-bold text-muted"
                      style="opacity: 0.75"
                    >{{ table.table_status === 'ready' ? '--.--' : (table.total_price).toFixed(2) + '฿' }}</span>
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
                displayOrderIndex = -1;
              "
              >
                <i class="fas fa-xmark text-muted clickable" style="font-size: 1.6em"></i>
              </span>
              <h2 class="fw-bold text-theme-2">Table {{ displayTable.table_id }}</h2>
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
                <div class="d-flex align-items-center">
                  <span v-show="displayTable.status === 'created'">
                    <i class="fas fa-clipboard-list me-2" style="font-size: 1.5em; color: #39c8ef"></i>
                    <span class="fw-bold text-muted">Check-in</span>
                  </span>
                  <span v-show="displayTable.status === 'pending'">
                    <i class="fas fa-clock me-2" style="font-size: 1.5em; color: #fad945"></i>
                    <span class="fw-bold text-muted">Waiting</span>
                  </span>
                  <span v-show="displayTable.status === 'served'">
                    <i class="fas fa-utensils me-2" style="font-size: 1.5em; color: #31d475"></i>
                    <span class="fw-bold text-muted">Served</span>
                  </span>
                  <span v-show="displayTable.status === 'billing'">
                    <i
                      class="fas fa-file-invoice-dollar me-2"
                      style="font-size: 1.5em; color: #fc8845"
                    ></i>
                    <span class="fw-bold text-muted">Billing</span>
                  </span>
                </div>
              </div>
              <div class="pe-3 m-0" style="overflow: auto" ref="tableInfoItem">
                <div
                  class="text-muted fw-bold fs-4 h-100 d-flex justify-content-center align-items-center"
                  style="opacity: .5"
                  v-if="displayOrderItems.length === 0"
                >No Order</div>
                <div
                  class="rounded p-3 bg-light mb-2 shadow-sm d-flex"
                  v-for="item in displayOrderItems"
                  :key="'item' + item.item_no"
                >
                  <div class="col-11 fw-bold text-theme-3">
                    <p class="line-limit-2 p-0 m-0">{{ item.menu_name }}</p>
                  </div>
                  <div class="col-1 fw-bold text-muted">x{{ item.amount }}</div>
                </div>
              </div>
              <section ref="tableInfoSummary">
                <div class="d-flex pe-4 py-3 flex-wrap">
                  <div
                    class="d-flex flex-column px-4 py-3 border me-2 mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span
                      class="fw-bold text-muted"
                      style="font-size: 0.8em; opacity: 0.75"
                    >Customer Name</span>
                    <span class="fs-5 fw-bold text-theme-3">{{ displayCustomer.full_name }}</span>
                  </div>
                  <div
                    class="d-flex flex-column px-4 py-3 border mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span
                      class="fw-bold text-muted"
                      style="font-size: 0.8em; opacity: 0.75"
                    >Check-in Time</span>
                    <span
                      class="fs-5 fw-bold text-theme-3"
                    >{{ displayCustomer.check_in ? displayCustomer.check_in.split(' ')[1] : '-' }}</span>
                  </div>
                  <div
                    class="d-flex flex-column px-4 py-3 border me-2 mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span
                      class="fw-bold text-muted"
                      style="font-size: 0.8em; opacity: 0.75"
                    >Item Amount</span>
                    <span class="fs-3 fw-bold text-theme-3">{{ displayTable.quantity_item }}</span>
                  </div>
                  <div
                    class="d-flex flex-column px-4 py-3 border mb-2"
                    style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                  >
                    <span class="fw-bold text-muted" style="font-size: 0.8em; opacity: 0.75">Total</span>
                    <span
                      class="fs-3 fw-bold text-theme-3"
                    >{{ displayTable.total_price ? displayTable.total_price.toFixed(2) : '0.00' }}฿</span>
                  </div>
                </div>
                <div class="d-flex justify-content-end pe-4">
                  <button
                    class="btn px-4 text-light btn-info me-2 fw-bold border-2"
                    style="opacity: 0"
                  >Emtpy Button</button>
                  <button
                    class="btn px-4 text-light bg-theme-3 me-2 fw-bold border-2"
                    v-show="displayTable.status === 'billing'"
                    @click="completeOrder()"
                  >
                    <i class="fa-solid fa-square-check me-2"></i>
                    Finish
                  </button>
                  <button
                    class="btn px-4 text-light bg-theme-3 me-2 fw-bold border-2"
                    v-show="displayTable.status === 'pending'"
                    @click="serveOrder()"
                  >
                    <i class="fas fa-bell-concierge me-2"></i>
                    Serve
                  </button>
                  <button
                    class="btn px-4 btn-danger text-light border-2 fw-bold"
                    v-show="['created', 'pending'].includes(displayTable.status)"
                    data-bs-toggle="modal"
                    data-bs-target="#cancelOrderModal"
                  >
                    <i class="fas fa-ban me-2"></i>Cancel
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="cancelOrderModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow border-0">
          <div class="modal-header bg-theme-2 border-0">
            <h5 class="modal-title fw-bold text-light">Cancel Order</h5>
          </div>
          <div class="modal-body border-0">
            Are you sure to cancel order for 'Table {{ displayTable.table_id }}'?
            <br />
            <span class="text-danger" style="font-size: .9em">Warning: This change can't turned back</span>
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-outline-secondary border-2 fw-bold"
              data-bs-dismiss="modal"
            >Cancel</button>
            <button
              class="btn btn-danger fw-bold text-light border-2"
              data-bs-dismiss="modal"
              @click="cancelOrder()"
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
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      showTableInfo: false,
      tables: [],
      menus: [],
      displayOrderIndex: -1,
      displayTable: {},
      displayOrderItems: [],
      displayCustomer: {},
      overviewInterval: "",
      infoInterval: "",
      filter: "",
      queue: 0,
    };
  },
  methods: {
    showInfo(table) {
      if (table.table_status === "ready") {
        return;
      }

      clearInterval(this.infoInterval);
      axios
        .get(`http://localhost:3000/order/${table.order_id}`)
        .then((res) => {
          this.displayTable = table;
          this.displayOrderItems = res.data.orderItems;
          this.displayCustomer = res.data.customer;

          var el = this.$refs["tableInfo"];
          el.style.animation = "show .3s";
          el.style.width = "33.33%";
          el.style.display = "initial";
        })
        .catch((err) => {
          console.log(err);
        });

      if (table.status === "created") {
        this.infoInterval = setInterval(() => {
          axios
            .get(`http://localhost:3000/order/${table.order_id}`)
            .then((res) => {
              this.displayOrderItems = res.data.orderItems;
              this.displayTable = this.tables.find(
                (val) => val.table_id === table.table_id
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
      }
    },
    hideInfo() {
      clearInterval(this.infoInterval);
      this.displayTable = {};
      this.displayOrderItems = [];
      this.displayCustomer = {};
      this.displayOrderIndex = -1;

      var el = this.$refs["tableInfo"];
      el.style.animation = "hide .3s";
      setTimeout(() => {
        el.style.display = "none";
        el.style.width = "0%";
      }, 300);
    },
    queuedTables() {
      var tables = [].concat(this.tables);
      tables.sort((a, b) => {
        if (
          a.status === "pending" &&
          b.status === "pending" &&
          new Date(a.ordering_time) < new Date(b.ordering_time)
        ) {
          return -1;
        } else if (a.status === "pending" && b.status !== "pending") {
          return -1;
        }
        return 1;
      });
      var queue = 1;
      for (var table of tables) {
        if (table.status === "pending") {
          table.queue = queue;
          queue++;
        } else if (table.status !== "pending") {
          break;
        }
      }
      return tables;
    },
    serveOrder() {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
          window.location.reload();
        } else if (
          xhttp.readyState == XMLHttpRequest.DONE &&
          xhttp.status !== 200
        ) {
          console.log("Error, cannot serve order.");
        }
      };

      xhttp.open(
        "PUT",
        `http://localhost:3000/order/${this.displayTable.order_id}/serve`,
        true
      );
      xhttp.send();
    },
    cancelOrder() {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
          window.location.reload();
        } else if (
          xhttp.readyState == XMLHttpRequest.DONE &&
          xhttp.status !== 200
        ) {
          console.log("Error, cannot serve order.");
        }
      };

      xhttp.open(
        "DELETE",
        `http://localhost:3000/order/${this.displayTable.order_id}/cancel`,
        true
      );
      xhttp.send();
    },
    completeOrder() {
      axios
        .post(
          `http://localhost:3000/order/${this.displayTable.order_id}/completed`
        )
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearAllInterval() {
      clearInterval(this.overviewInterval);
      clearInterval(this.infoInterval);
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

    this.overviewInterval = setInterval(() => {
      axios
        .get("http://localhost:3000/tables")
        .then((res) => {
          this.tables = res.data.tables;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  },
  computed: {
    filteredTables() {
      if (this.filter === "created") {
        return this.queuedTables().filter((val) => val.status === "created");
      } else if (this.filter === "pending") {
        return this.queuedTables().filter((val) => val.status === "pending");
      } else if (this.filter === "served") {
        return this.queuedTables().filter((val) => val.status === "served");
      } else if (this.filter === "billing") {
        return this.queuedTables().filter((val) => val.status === "billing");
      }
      return this.queuedTables();
    },
  },
  mounted() {
    var currentHeight = window.innerHeight;
    this.$refs["container"].style.height = currentHeight + "px";
    this.$refs["mainCanvas"].style.height = `calc(${currentHeight}px - 3rem)`;

    var tableInfoBodyHeight = this.$refs["tableInfoBody"].clientHeight;
    var tableInfoStatusHeight = this.$refs["tableInfoStatus"].clientHeight;
    var tableInfoSummaryHeight = this.$refs["tableInfoSummary"].clientHeight;

    this.$refs["tableInfo"].style.overflow = "hidden";
    this.$refs["tableInfo"].style.display = "none";

    this.$refs["tableInfoItem"].style.height = `calc(${
      tableInfoBodyHeight - tableInfoStatusHeight - tableInfoSummaryHeight
    }px - 8rem)`;

    window.onresize = () => {
      currentHeight = window.innerHeight;
      this.$refs["container"].style.height = currentHeight + "px";
      this.$refs["mainCanvas"].style.height = `calc(${currentHeight}px - 3rem)`;
    };
  },
};
</script>