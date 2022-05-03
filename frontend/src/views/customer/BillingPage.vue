<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-center px-3 py-4 bg-theme-3"
    ref="container"
  >
    <div class="col-12 bg-light shadow-sm pb-5" style="border-radius: 1rem">
      <div class="col-12 p-3 pb-2 mb-3 d-flex flex-column border-bottom align-items-center">
        <h3 class="fw-bold text-center text-muted">Receipt</h3>
      </div>
      <div class="col-12 d-flex flex-column px-3 pb-2 mb-3 border-bottom">
        <span class="fw-bold text-dark mb-3" style="font-size: .9em">Item List</span>
        <div
          class="col-12 d-flex border rounded mb-2"
          v-for="item in filteredItems"
          :key="'item' + item.item_no"
        >
          <div class="col-2 d-flex justify-content-center align-items-center">
            <img
              :src="item.image_file_path ? `http://localhost:3000${item.image_file_path}` : 'http://localhost:3000/image-not-found.png'"
              style="width: 100%"
              alt
            />
          </div>
          <div class="col-10 d-flex flex-wrap p-1 px-3">
            <div class="col-11 fw-bold d-flex align-items-center" style="font-size: .9em;">
              <p class="line-limit-1 m-0 p-0">{{ item.menu_name }}</p>
            </div>
            <div
              class="col-8 text-muted d-flex align-items-center"
              style="font-size: .8em"
            >{{ item.total_price.toFixed(2) }}฿</div>
            <div class="col-4 text-end fw-bold text-muted">x{{ item.amount }}</div>
          </div>
        </div>
        <div
          class="col-12 d-flex justify-content-center clickable"
          @click="expandItem = !expandItem"
          v-if="orderItems.length > 3"
        >
          <span v-show="!expandItem">
            <i class="fas fa-angle-down"></i>
          </span>
          <span v-show="expandItem">
            <i class="fas fa-angle-up"></i>
          </span>
        </div>
      </div>
      <div class="col-12 d-flex flex-column px-3 mb-3">
        <span class="fw-bold text-dark mb-3" style="font-size: .9em">Details</span>
        <div
          class="text-theme-2 fw-bold pe-3 text-muted fs-bold d-flex justify-content-between mb-2"
          style="font-size: .9em"
        >
          Receipt Number
          <span class="text-theme-3">{{ receipt.receipt_no }}</span>
        </div>
        <div
          class="text-theme-2 fw-bold pe-3 text-muted fs-bold d-flex justify-content-between mb-2"
          style="font-size: .9em"
          v-if="customer.full_name"
        >
          Customer
          <span class="text-theme-3">{{ customer.full_name }}</span>
        </div>
        <div
          class="text-theme-2 fw-bold pe-3 text-muted fs-bold d-flex justify-content-between mb-2"
          style="font-size: .9em"
        >
          Check-in Date
          <span class="text-theme-3">{{ formatDate(customer.check_in) }}</span>
        </div>
        <div
          class="text-theme-2 fw-bold pe-3 text-muted fs-bold d-flex justify-content-between mb-2"
          style="font-size: .9em"
        >
          Check-in Time
          <span class="text-theme-3">{{ formatTime(customer.check_in) }}</span>
        </div>
      </div>
      <div class="col-12 d-flex flex-column px-3">
        <span class="fw-bold text-dark mb-3" style="font-size: .9em">Summary</span>
        <div
          class="text-theme-2 fw-bold pe-3 text-muted fs-bold d-flex justify-content-between mb-2"
          style="font-size: .9em"
        >
          Quantity
          <span class="text-theme-3">x{{ order.quantity_item }}</span>
        </div>
        <div
          class="fw-bold pe-3 text-muted fs-bold d-flex justify-content-between mb-2"
          style="font-size: .9em"
        >
          Total
          <span
            class="text-warning fs-5"
          >{{ order.total_price ? order.total_price.toFixed(2) : '0.00' }}฿</span>
        </div>
      </div>
    </div>
    <div
      class="col-12 mt-3 d-flex flex-column align-items-center position-relative mb-5"
      style="border-radius: 1rem"
    >
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span class="fw-bold text-light fs-3" style="opacity: .8">Waiting for employee</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {},
      orderItems: [],
      customer: {},
      receipt: {},
      expandItem: false,
    };
  },
  methods: {
    formatDate(datetimeStr) {
      var datetime = new Date(datetimeStr);
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${datetime.getDate()} ${
        months[datetime.getMonth()]
      } ${datetime.getFullYear()}`;
    },
    formatTime(datetimeStr) {
      var datetime = new Date(datetimeStr);
      return `${(datetime.getHours() + 1000).toString().slice(2)}:${(
        datetime.getMinutes() + 1000
      )
        .toString()
        .slice(2)}:${(datetime.getSeconds() + 1000).toString().slice(2)}`;
    },
  },
  computed: {
    filteredItems() {
      var orderItems = [].concat(this.orderItems);
      if (!this.expandItem) {
        orderItems.splice(3);
      }
      return orderItems;
    },
  },
  created() {
    axios
      .get(`http://localhost:3000/table/${this.$route.params.tableId}/billing`)
      .then((res) => {
        var data = res.data;
        this.order = data.order;
        this.orderItems = data.orderItems;
        this.customer = data.customer;
        this.receipt = data.receipt;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.$refs.container.style.minHeight = window.outerHeight + "px";

    window.onresize = () => {
      this.$refs.container.style.minHeight = window.innerHeight + "px";
    };
  },
};
</script>