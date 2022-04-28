<template>
  <div class="container bg-light d-flex flex-column justify-content-between" ref="container">
    <section ref="sectionTop">
      <div class="row shadow-sm py-3 position-sticky bg-theme-3" style="z-index: 1">
        <div class="col-12 pb-2">
          <h3 class="fw-bold text-light">Order List</h3>
        </div>
        <div class="col-12 d-flex align-items-center text-theme-4">
          <router-link
            :to="`/table/${this.tableId}/menu`"
            class="clickable text-theme-4 text-decoration-none"
          >
            <i class="fas fa-angle-left"></i>
            <span class="ms-2">Menus</span>
          </router-link>
        </div>
      </div>

      <!-- order list -->
      <div class="row" v-if="order.quantity_item === 0">
        <span class="fs-3 fw-bold d-flex justify-content-center py-5" style="opacity: .3">No Order</span>
      </div>

      <div
        class="row py-2 px-0 rounded bg-light shadow-sm mx-1 my-2"
        v-for="item in orderItems"
        :key="'item' + item.item_no"
      >
        <div class="col-4 d-flex justify-content-start">
          <img
            :src="getImageFileName(item.menu_id) || 'https://bulma.io/images/placeholders/128x128.png'"
            class="rounded"
            style="width: 96px; height: 96px; object-fit: cover"
            alt
          />
        </div>
        <div class="col-8 d-flex flex-wrap">
          <div class="col-12">
            <span class="text-theme-2 fw-bold line-limit-2">{{ getMenuName(item.menu_id) }}</span>
          </div>
          <div
            class="col-7 d-flex flex-column fw-bold text-muted text-nowrap"
            style="font-size: .8em"
          >
            <span>{{ item.total_price }}฿</span>
          </div>
          <div class="col-5 d-flex justify-content-end align-items-end ps-3 py-2 pe-0">
            <div class="d-flex justify-content-between align-items-center w-100">
              <span @click="remove(item)">
                <i class="fas fa-square-minus fs-2 clickable" style="color: hsl(0, 0%, 0%, 30%)"></i>
              </span>
              <span class="mx-2 fw-bold text-muted">{{ item.amount }}</span>
              <span @click="add(item)">
                <i class="fas fa-square-plus fs-2 clickable" style="color: hsl(0, 0%, 0%, 30%)"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="row py-3 px-2 bottom-0 position-sticky shadow rounded-3-top pb-5"
      style="background: hsl(0, 0%, 100%, 80%); backdrop-filter: blur(4px)"
    >
      <div class="col-12 d-flex justify-content-between mb-4">
        <span class="fw-bold text-muted fs-5">Total</span>
        <span
          class="fw-bold fs-5 text-theme-3"
        >{{ order.total_price >= 0 ? order.total_price.toFixed(2) : '-' }}฿</span>
      </div>
      <div class="col-12 mb-2">
        <a
          class="btn text-light w-100 border-2 py-3 fw-bold bg-danger"
          data-bs-toggle="modal"
          :data-bs-target="order.quantity_item ? '#confirmClearModal' : '#'"
        >Clear</a>
      </div>
      <div class="col-12">
        <a class="btn btn-outline-dark border-2 w-100 py-3 fw-bold" @click="confirmOrder()">Confirm</a>
      </div>
    </section>

    <!-- confirm clear modal -->
    <div class="modal fade" id="confirmClearModal" tabindex="1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-muted">Confirm Clear Order</h5>
          </div>
          <div class="modal-body">Are you sure to delete all item?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary border-2 fw-bold"
              data-bs-dismiss="modal"
            >Cancel</button>
            <button
              type="button"
              class="btn btn-danger fw-bold"
              data-bs-dismiss="modal"
              @click="clearItem()"
            >Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableId: "",
      customer: {},
      menus: [],
      order: {},
      orderItems: [],
    };
  },
  methods: {
    getMenuName(menuId) {
      return this.menus.find((val) => val.menu_id === menuId).menu_name;
    },
    getImageFileName(menuId) {
      return this.menus.find((val) => val.menu_id === menuId).image_file_path;
    },
    remove(item) {
      if (item.amount === 1) {
        this.deleteItem(item);
        return;
      }

      this.decreaseItem(item);
    },
    add(item) {
      this.increaseItem(item);
    },
    decreaseItem(item) {
      axios
        .put(
          `http://localhost:3000/order/${this.order.order_id}/${item.item_no}/decrease`
        )
        .then(() => {
          item.total_price -= item.price;
          item.amount -= 1;
          this.order.total_price -= item.price;
          this.order.quantity_item -= 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    increaseItem(item) {
      axios
        .put(
          `http://localhost:3000/order/${this.order.order_id}/${item.item_no}/increase`
        )
        .then(() => {
          item.total_price += item.price;
          item.amount += 1;
          this.order.total_price += item.price;
          this.order.quantity_item += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteItem(item) {
      axios
        .delete(
          `http://localhost:3000/order/${this.order.order_id}/${item.item_no}/delete`
        )
        .then(() => {
          var targetIndex = this.orderItems.findIndex(
            (val) => val.item_no === item.item_no
          );
          this.order.total_price -= item.price;
          this.order.quantity_item -= 1;
          this.orderItems.splice(targetIndex, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearItem() {
      axios
        .delete(`http://localhost:3000/order/${this.order.order_id}/clear`)
        .then(() => {
          this.order.total_price = 0.0;
          this.order.quantity_item = 0;
          this.orderItems = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmOrder() {
      if (this.order.quantity_item === 0) {
        return;
      }
      axios
        .post(`http://localhost:3000/order/${this.order.order_id}/confirm`)
        .then(() => {
          this.$router.push(`/table/${this.tableId}/waiting`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.tableId = this.$route.params.tableId;
    axios
      .get(`http://localhost:3000/table/${this.tableId}/order`)
      .then((res) => {
        this.menus = res.data.menus;
        this.order = res.data.order;
        this.orderItems = res.data.orderItems;
        this.customer = res.data.customer;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.$refs.container.style.minHeight = window.outerHeight + "px";
    var height = this.$refs.sectionTop.children[0].children[0].clientHeight;
    this.$refs.sectionTop.children[0].style.top = -1 * height + "px";

    window.onresize = () => {
      this.$refs.container.style.minHeight = window.innerHeight + "px";
    };
  },
};
</script>
