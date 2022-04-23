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
              <router-link to="/manager/tables">
                <i class="fas fa-table-cells text-light"></i>
              </router-link>
            </div>
            <div class="my-3 clickable">
              <i class="fas fa-burger text-warning"></i>
            </div>
            <div class="my-3 clickable">
              <i class="fas fa-user"></i>
            </div>
          </div>
          <div class="col py-3 px-4 d-flex flex-wrap" ref="mainCanvas">
            <div
              class="col-12 pb-5 d-flex align-items-center justify-content-between"
              ref="titleBar"
              style="height: 10%"
            >
              <h1 class="fw-bold text-theme-2">Menus</h1>
              <div class="col-8 d-flex align-items-center justify-content-end pe-3">
                <div class="w-50">
                  <div class="me-4">
                    <input
                      class="form-control rounded-pill py-2 px-4"
                      type="text"
                      placeholder="Search"
                      v-model="searchQuery"
                    />
                  </div>
                </div>
                <div
                  class="rounded-pill d-flex justify-content-evenly bg-light"
                  style="border: 1px solid #d4dcdc"
                >
                  <div class="fs-4 px-3 py-1" style="color: #888">
                    <span
                      :class="{'text-info': sortBy === 'alphabetAsc'}"
                      @click="sortBy = sortBy === 'alphabetAsc' ? 'recent' : 'alphabetAsc'"
                    >
                      <i class="fas fa-arrow-down-a-z px-2 clickable"></i>
                    </span>
                    <span
                      :class="{'text-info': sortBy === 'alphabetDesc'}"
                      @click="sortBy = sortBy === 'alphabetDesc' ? 'recent' : 'alphabetDesc'"
                    >
                      <i class="fas fa-arrow-down-z-a px-2 clickable"></i>
                    </span>
                    <span
                      :class="{'text-info': sortBy === 'priceAsc'}"
                      @click="sortBy = sortBy === 'priceAsc' ? 'recent' : 'priceAsc'"
                    >
                      <i class="fas fa-arrow-down-1-9 px-2 clickable"></i>
                    </span>
                    <span
                      :class="{'text-info': sortBy === 'priceDesc'}"
                      @click="sortBy = sortBy === 'priceDesc' ? 'recent' : 'priceDesc'"
                    >
                      <i class="fas fa-arrow-down-9-1 px-2 clickable"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-8 d-flex flex-column pe-3"
              style="overflow: auto; height: 90%"
              ref="menusOverview"
            >
              <div
                class="col-12 bg-light shadow-sm py-3 pe-4 mb-3"
                style="border-radius: 1rem"
                v-for="i in 20"
                :key="'menu' + i"
              >
                <div class="d-flex justify-content-between">
                  <div class="col-3 d-flex justify-content-evenly align-items-center">
                    <i class="fas fa-circle" style="color: #31d475"></i>
                    <div style="height: 128px; position: relative">
                      <img
                        class="rounded"
                        src="https://bulma.io/images/placeholders/128x128.png"
                        style="height: 128px; object-fit: cover"
                      />
                      <div v-if="false" class="edit-image rounded top-0 clickable" @click="showChooseImage()">
                        <i class="fas fa-pen-to-square fs-4" style="opacity: .3;"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-8 d-flex flex-wrap">
                    <div class="col-12 d-flex p-2">
                      <div class="fs-5 p-2 fw-bold text-muted">Menu Name</div>
                      <!-- <input class="form-control m-0 fs-5 p-2 fw-bold text-muted" type="text" value="Menu Name"> -->
                    </div>
                    <div class="col-3 p-2">
                      <div class="p-2">220.00฿</div>
                      <!-- <input class="form-control m-0 p-2" type="text" value="Menu Name"> -->
                    </div>
                    <div class="col-3 p-2" style="color: #fc8845">
                      <div class="p-2">
                        <i class="fas fa-tag me-2"></i>220.00฿
                      </div>
                      <!-- <input class="form-control m-0 p-2" type="text" value="Menu Name"> -->
                    </div>
                  </div>
                  <div class="col-1 d-flex justify-content-end">
                    <span class="clickable">
                      <i class="fas fa-pen text-muted fs-5"></i>
                    </span>
                    <!-- <i class="fas fa-pen text-warning fs-5"></i> -->
                  </div>
                </div>
                <div class="col-3 d-flex justify-content-end">
                  <div v-if="false">
                    <input
                      class="form-control mt-3"
                      style="width: 128px"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4 px-3">
              <div class="col-12 shadow-sm p-4 pe-5 pb-5 bg-light" style="border-radius: 1rem">
                <div class="col-12 fs-3 fw-bold text-theme-2 mb-4">Add Menu</div>
                <div class="col-12 d-flex flex-wrap">
                  <div class="mb-3 fw-bold text-muted">Menu Info</div>
                  <div class="col-12 mb-3">
                    <!-- <label class="form-label text-muted fw-bold">Menu Name</label> -->
                    <input type="text" class="form-control py-3 px-4" placeholder="Name" />
                  </div>
                  <div class="col-6 mb-3 pe-3">
                    <!-- <label class="form-label text-muted fw-bold">Menu Price</label> -->
                    <input type="number" class="form-control py-3 px-4" placeholder="Price" />
                  </div>
                  <div class="col-6 mb-4">
                    <!-- <label class="form-label text-muted fw-bold">Discount (for member)</label> -->
                    <input
                      type="number"
                      class="form-control py-3 px-4"
                      placeholder="Discount Price (optional)"
                    />
                    <!-- <div class="form-text">Optional</div> -->
                  </div>
                  <div class="mb-3 fw-bold text-muted">Menu Image</div>
                  <div class="mb-3">
                    <input type="file" class="form-control" accept="image/*" @change="chooseImage" />
                  </div>
                  <div class="col-12 mb-4">
                    <img
                      :src="displayImagePreview()"
                      class="card-img-top rounded"
                      style="height: 256px; width: 256px; object-fit: cover"
                      v-if="newImageFile"
                    />
                  </div>
                  <div class="col-12">
                    <button type="button" class="btn text-light btn-warning border-2 fw-bold">Submit</button>
                  </div>
                </div>
              </div>
            </div>
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
      sortBy: "recent",
      searchQuery: "",
      newImageFile: "",
      newImageName: "",
      editingMenuIndex: -1,
    };
  },
  methods: {
    displayImagePreview() {
      return URL.createObjectURL(this.newImageFile);
    },
    chooseImage(event) {
      this.newImageFile = event.target.files[0];
      this.newImageName = event.target.files[0].name;
    },
    showChooseImage() {
      var input = document.createElement("input");
      input.type = "file";

      input.onchange = (e) => {
        var file = e.target.files[0];
        console.log(file);
      };

      input.click();
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