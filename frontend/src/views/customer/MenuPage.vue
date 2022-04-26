<template>
  <div class="container" ref="container">
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
            <span
              class="clickable text-light"
              data-bs-toggle="dropdown"
            >
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
          <span style="position: relative">
            <i class="fas fa-clipboard-check text-light clickable" style="font-size: 1.5em; "></i>
            <span class="number-notification">10</span>
          </span>
        </div>
      </div>
    </div>

    <!-- menu list -->
    <div class="row py-2 px-0 rounded bg-light shadow-sm mx-1 my-2" v-for="i in 20" :key="i">
      <div class="col-4 d-flex justify-content-start">
        <img
          src="https://bulma.io/images/placeholders/128x128.png"
          class="rounded"
          style="width: 96px; height: 96px; object-fit: cover"
          alt
        />
      </div>
      <div class="col-8 d-flex flex-wrap">
        <div class="col-12">
          <span class="text-theme-2 fw-bold line-limit-2">Menu Name</span>
        </div>
        <!-- <div class="col-12 fw-bold text-muted" style="font-size: .8em"> -->
        <!-- <span style="text-decoration: line-through; opacity: .5;" v-if="menu.menu_price !== menu.member_price">{{ menu.menu_price.toFixed(2) }}฿</span> -->
        <!-- <span>{{ menu.member_price.toFixed(2) }}฿</span> -->
        <!-- </div> -->
        <div
          class="col-6 d-flex flex-column fw-bold text-muted text-nowrap"
          style="font-size: .8em"
        >
          <span :style="{textDecoration: true ? 'line-through' : 'initial'}">220.00฿</span>
          <span class style="color: #fc8845" v-if="true">
            <i class="fas fa-tag me-1"></i>
            220.00฿
          </span>
        </div>
        <div class="col-6 d-flex justify-content-end align-items-end p-2 pe-0">
          <button class="btn btn-warning px-3 py-1 fw-bold text-light" style="font-size: .8em">Add</button>
          <!-- <i :id="'menu' + menu.menu_id" class="fas fa-plus-circle clickable" style="font-size: 1.5em; color: #ffa723"
          @click="add(menu)" key="'menu' + menu.menu_id" disabled></i>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      sortBy: "",
    };
  },
  methods: {
    async add() {},
    async fetchIncrease() {},
    async fetchAdd() {},
  },
  created() {},
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