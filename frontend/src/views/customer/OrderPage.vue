<template>
  <div class="container bg-light d-flex flex-column justify-content-between" ref="container">
    <section ref="sectionTop">
      <div class="row shadow-sm py-3 position-sticky bg-theme-3" style="z-index: 1">
        <div class="col-12 pb-2">
          <h3 class="fw-bold text-light">Order List</h3>
        </div>
        <div class="col-12 d-flex align-items-center clickable text-theme-4">
          <i class="fas fa-angle-left"></i>
          <span class="ms-2">Menus</span>
        </div>
      </div>

      <!-- order list -->
      <div class="row" v-if="false">
        <spam class="fs-3 fw-bold d-flex justify-content-center py-4" style="opacity: .3">No Order</spam>
      </div>

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
            class="col-7 d-flex flex-column fw-bold text-muted text-nowrap"
            style="font-size: .8em"
          >
            <span>220.00฿</span>
          </div>
          <div class="col-5 d-flex justify-content-end align-items-end ps-3 py-2 pe-0">
            <div class="d-flex justify-content-between align-items-center w-100">
              <i class="fas fa-square-minus fs-2 clickable" style="color: hsl(0, 0%, 0%, 30%)"></i>
              <span class="mx-2 fw-bold text-muted">{{i}}</span>
              <i class="fas fa-square-plus fs-2 clickable" style="color: hsl(0, 0%, 0%, 30%)"></i>
            </div>
            <!-- <button class="btn btn-warning px-3 py-1 fw-bold text-light" style="font-size: .8em">Add</button> -->
            <!-- <i :id="'menu' + menu.menu_id" class="fas fa-plus-circle clickable" style="font-size: 1.5em; color: #ffa723"
            @click="add(menu)" key="'menu' + menu.menu_id" disabled></i>-->
          </div>
        </div>
      </div>
    </section>

    <section class="row py-3 px-2 bottom-0 position-sticky shadow rounded-3-top pb-5" style="background: hsl(0, 0%, 100%, 80%); backdrop-filter: blur(4px)">
      <div class="col-12 d-flex justify-content-between mb-4">
        <span class="fw-bold text-muted fs-5">Total</span>
        <span class="fw-bold fs-5 text-theme-3">1000.00฿</span>
      </div>
      <div class="col-12 mb-2">
        <a
          class="btn text-light w-100 border-2 py-3 fw-bold bg-danger"
          data-bs-toggle="modal"
          data-bs-target="#"
        >Clear</a>
      </div>
      <div class="col-12">
        <a class="btn btn-outline-dark border-2 w-100 py-3 fw-bold">Confirm</a>
      </div>
    </section>

    <!-- confirm delete modal -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
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
