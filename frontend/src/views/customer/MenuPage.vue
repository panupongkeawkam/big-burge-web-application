<template>
  <div class="container pb-5" ref="container">
    <div class="row shadow-sm py-3 position-sticky bg-theme-3" style="z-index: 1">
      <div class="col-12 pb-2">
        <h3 class="fw-bold text-light">Menus</h3>
      </div>
      <div class="col-12 d-flex">
        <input
          class="form-control border-0 rounded-pill px-3"
          type="text"
          placeholder="Search"
          v-model="searchQuery"
        />
        <div class="d-flex justify-content-center align-items-center ms-3">
          <div>
            <span class="clickable text-light" data-bs-toggle="dropdown">
              <i class="fas fa-sort position-relative me-3" style="font-size: 1.5em"></i>
            </span>
            <ul class="dropdown-menu p-3 shadow-sm border-0">
              <span class="fw-bold text-muted pb-5">Sort By</span>
              <li>
                <a
                  class="dropdown-item px-1 text-theme-1 pt-2"
                  :class="{'text-info': sortBy === 'lowerPrice'}"
                  @click="sortBy = sortBy === 'lowerPrice' ? '' : 'lowerPrice'"
                >
                  <i class="fas fa-arrow-down-1-9 me-2"></i>Lower Price
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item px-1 text-theme-1"
                  :class="{'text-info': sortBy === 'higherPrice'}"
                  @click="sortBy = sortBy === 'higherPrice' ? '' : 'higherPrice'"
                >
                  <i class="fas fa-arrow-down-9-1 me-2"></i>Higher Price
                </a>
              </li>
            </ul>
          </div>
          <router-link :to="`/table/${this.tableId}/order`" style="position: relative">
            <i class="fas fa-clipboard-check text-light clickable" style="font-size: 1.5em; "></i>
            <span class="number-notification" v-if="order.quantity_item">{{ order.quantity_item }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- menu list -->
    <div class="row" v-if="sortedMenus.length === 0">
      <span class="fs-3 fw-bold d-flex justify-content-center py-5" style="opacity: .3">No Result</span>
    </div>

    <div
      class="row py-2 px-0 rounded bg-light shadow-sm mx-1 my-2"
      v-for="menu in sortedMenus"
      :key="'menu' + menu.menu_id"
    >
      <div class="col-4 d-flex justify-content-start">
        <img
          :src="menu.image_file_path ?  `http://localhost:3000${menu.image_file_path}` : 'http://localhost:3000/image-not-found.png'"
          class="rounded"
          style="width: 96px; height: 96px; object-fit: cover"
          alt
        />
      </div>
      <div class="col-8 d-flex flex-wrap">
        <div class="col-12">
          <span class="text-theme-2 fw-bold line-limit-2">{{ menu.menu_name }}</span>
        </div>
        <div
          class="col-6 d-flex flex-column fw-bold text-muted text-nowrap"
          style="font-size: .8em"
        >
          <span
            :style="{textDecoration: customer.account_id !== null && menu.member_price ? 'line-through' : 'initial'}"
          >{{ menu.menu_price.toFixed(2) }}฿</span>
          <span
            class
            style="color: #fc8845"
            v-if="customer.account_id !== null && menu.member_price"
          >
            <i class="fas fa-tag me-1"></i>
            {{ menu.member_price.toFixed(2) }}฿
          </span>
        </div>
        <div class="col-6 d-flex justify-content-end align-items-end p-2 pe-0">
          <button
            class="btn btn-warning px-3 py-1 fw-bold text-light"
            style="font-size: .8em"
            @click="add(menu)"
          >Add</button>
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
      searchQuery: "",
      sortBy: "",
      tableId: "",
      menus: [],
      order: {},
      orderItems: [],
      customer: {},
    };
  },
  methods: {
    async add(menu) {
      var targetItem = this.orderItems.find(
        (val) => val.menu_id === menu.menu_id
      );

      if (targetItem !== undefined) {
        this.increaseItem(targetItem);
        return;
      }

      var price =
        this.customer.account_id === null ? menu.menu_price : menu.member_price;

      this.addNewItem({
        menu_id: menu.menu_id,
        menu_price: price,
      });
    },
    increaseItem(item) {
      axios
        .put(
          `http://localhost:3000/order/${this.order.order_id}/${item.item_no}/increase`
        )
        .then(() => {
          item.amount += 1;
          item.total_price += item.price;
          this.order.total_price += item.price;
          this.order.quantity_item += 1;
        })
        .catch((err) => {
          console.log(err);
          window.location.reload();
        });
    },
    addNewItem(menu) {
      axios
        .post(`http://localhost:3000/order/${this.order.order_id}/add`, {
          menu: menu,
        })
        .then((res) => {
          var newOrderItem = {
            item_no: res.data.item_no,
            total_price: menu.menu_price,
            amount: 1,
            price: menu.menu_price,
            order_id: this.order.order_id,
            menu_id: menu.menu_id,
          };

          this.orderItems.push(newOrderItem);
          this.order.total_price += newOrderItem.price;
          this.order.quantity_item += 1;
        })
        .catch((err) => {
          console.log(err);
          window.location.reload();
        });
    },
  },
  computed: {
    sortedMenus() {
      var menus = this.menus.concat([]);
      if (this.sortBy === "lowerPrice" && this.customer.account_id === null) {
        menus.sort((a, b) => (a.menu_price < b.menu_price ? -1 : 1));
      } else if (
        this.sortBy === "higherPrice" &&
        this.customer.account_id === null
      ) {
        menus.sort((a, b) => (a.menu_price > b.menu_price ? -1 : 1));
      } else if (
        this.sortBy === "lowerPrice" &&
        this.customer.account_id !== null
      ) {
        menus.sort((a, b) => (a.member_price < b.member_price ? -1 : 1));
      } else if (
        this.sortBy === "higherPrice" &&
        this.customer.account_id !== null
      ) {
        menus.sort((a, b) => (a.member_price > b.member_price ? -1 : 1));
      }
      return menus.filter((val) =>
        val.menu_name
          .toLowerCase()
          .includes(this.searchQuery.trim().toLowerCase())
      );
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
        window.location.reload();
      });
  },
  mounted() {
    this.$refs.container.style.minHeight = window.outerHeight + "px";
    var height = this.$refs.container.children[0].children[0].clientHeight;
    this.$refs.container.children[0].style.top = -1 * height + "px";

    window.onresize = () => {
      this.$refs.container.style.minHeight = window.innerHeight + "px";
    };
  },
};
</script>