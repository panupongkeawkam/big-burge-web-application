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
                <router-link to="/manager/tables">
                  <i class="fas fa-table-cells text-light"></i>
                </router-link>
              </div>
              <div class="my-3 clickable">
                <i class="fas fa-burger text-warning"></i>
              </div>
              <div class="my-3 clickable">
                <router-link to="/manager/profile">
                  <i class="fas fa-user text-light"></i>
                </router-link>
              </div>
            </div>
            <div class="col py-3 px-4 d-flex flex-wrap" ref="mainCanvas">
              <div
                class="col-12 pb-5 d-flex align-items-center justify-content-between"
                ref="titleBar"
                style="height: 10%"
              >
                <div class="fw-bold text-theme-2 fs-1">Menus</div>
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
                  v-for="(i, index) in 20"
                  :key="'menu' + i"
                >
                  <div class="d-flex justify-content-between">
                    <div class="col-3 d-flex justify-content-evenly align-items-center">
                      <i class="fas fa-circle" style="color: #31d475"></i>
                      <div style="height: 128px; position: relative">
                        <div v-if="editingMenuIndex === index">
                          <img
                            class="rounded"
                            :src="imageDecode(editMenu.imageFile)"
                            style="height: 128px; width: 128px; object-fit: cover"
                          />
                          <div
                            class="edit-image rounded top-0 clickable"
                            @click="chooseEditImage()"
                          >
                            <i
                              class="fas fa-pen-to-square fs-4 text-light"
                              style="text-shadow: 2px 4px 3px rgba(0,0,0,0.3)"
                            ></i>
                          </div>
                        </div>
                        <img
                          class="rounded"
                          src="https://bulma.io/images/placeholders/128x128.png"
                          style="height: 128px; width: 128px; object-fit: cover"
                          v-else
                        />
                      </div>
                    </div>
                    <div class="col-6 d-flex flex-wrap">
                      <div class="col-12 p-2">
                        <input
                          class="form-control m-0 fs-5 p-2 fw-bold text-muted is-invalid"
                          v-model="editMenu.name"
                          placeholder="Name"
                          :style="{opacity: editMenu.name === '' ? '.5' : '1'}"
                          type="text"
                          value="Menu Name"
                          v-if="editingMenuIndex === index"
                        />
                        <div class="fs-5 p-2 fw-bold text-muted" v-else>Menu Name</div>
                      </div>
                      <div class="col-4 p-2">
                        <input
                          class="form-control m-0 p-2"
                          v-model="editMenu.price"
                          placeholder="Price"
                          type="number"
                          value="Menu Name"
                          v-if="editingMenuIndex === index"
                        />
                        <div class="p-2" v-else>220.00฿</div>
                      </div>
                      <div class="col-4 p-2" style="color: #fc8845">
                        <input
                          class="form-control m-0 p-2"
                          v-model="editMenu.discount"
                          placeholder="Discount"
                          type="number"
                          value="Menu Name"
                          v-if="editingMenuIndex === index"
                        />
                        <div class="p-2" style="white-space: nowrap" v-else>
                          210.00฿
                          <i class="fas fa-tag ms-2"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-3 d-flex flex-column align-items-end justify-content-between">
                      <span
                        class="clickable"
                        v-show="editingMenuIndex !== index"
                        @click="editing(null); editingMenuIndex = index"
                      >
                        <i class="fas fa-pen text-muted fs-5"></i>
                      </span>
                      <span
                        class="clickable"
                        v-show="editingMenuIndex === index"
                        @click="editingMenuIndex = -1"
                      >
                        <i class="fas fa-xmark text-muted fs-3"></i>
                      </span>
                      <div v-if="editingMenuIndex === index">
                        <button
                          class="btn btn-info text-light me-2 fw-bold border-2"
                          @click="saveEdit()"
                        >Save</button>
                        <button
                          class="btn btn-danger fw-bold"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmDeleteModal"
                          @click="deleteMenu.name = 'Test'"
                        >Delete</button>
                      </div>
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
                        placeholder="Discount (optional)"
                      />
                      <!-- <div class="form-text">Optional</div> -->
                    </div>
                    <div class="mb-3 fw-bold text-muted">Menu Image</div>
                    <div>
                      <input
                        type="file"
                        class="form-control"
                        accept="image/*"
                        @change="chooseNewImage"
                      />
                    </div>
                    <div class="col-12 mt-3" v-if="newMenu.imageFile">
                      <img
                        :src="imageDecode(newMenu.imageFile)"
                        class="card-img-top rounded border"
                        style="height: 256px; width: 256px; object-fit: cover"
                      />
                      <div class="form-text">Image will display square (1:1).</div>
                    </div>
                    <div class="col-12 mt-4">
                      <button
                        type="button"
                        class="btn text-light btn-warning border-2 fw-bold"
                      >Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="confirmDeleteModal" tabindex="1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-muted">Confirm Delete</h5>
          </div>
          <div class="modal-body">
            Are you sure to delete "{{ deleteMenu.name.slice(0, 21).trim() }}{{
            deleteMenu.name.length > 20 ? '...' : '' }}"?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary border-2 fw-bold"
              data-bs-dismiss="modal"
            >Cancel</button>
            <button type="button" class="btn btn-danger fw-bold" data-bs-dismiss="modal">Confirm</button>
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
      editingMenuIndex: -1,
      newMenu: {
        name: "",
        price: "",
        discount: "",
        imageFile: "",
      },
      editMenu: {
        id: "",
        name: "",
        price: "",
        discount: "",
        status: "",
        imageFile: "",
      },
      deleteMenu: {
        id: "",
        name: "",
      },
      error: {
        newName: false,
        newPrice: false,
        newDiscount: false,
        newImageFile: false,
        editName: false,
        editPrice: false,
        editDiscount: false,
        editImageFile: false,
      },
    };
  },
  methods: {
    imageDecode(imageFile) {
      if (typeof imageFile !== "object") {
        return imageFile;
      } else if (imageFile) {
        return URL.createObjectURL(imageFile);
      }
    },
    chooseNewImage(event) {
      this.newMenu.imageFile = event.target.files[0];
      this.newMenu.imageName = event.target.files[0].name;
    },
    chooseEditImage() {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        this.editMenu.imageFile = e.target.files[0];
        console.log(this.editMenu.imageFile);
      };

      input.click();
    },
    addNew() {
      //
    },
    editing(menu) {
      console.log("Menu param: " + menu);
      this.editMenu.name = "Menu Name";
      this.editMenu.price = "220";
      this.editMenu.discount = "210";
      this.editMenu.imageFile =
        "https://bulma.io/images/placeholders/128x128.png";
    },
    saveEdit() {
      //
    },
    confirmDelete() {
      console.log(this.deleteMenu.id);
      console.log(this.deleteMenu.name);
      //
    },
  },
  created() {
    axios
      .get("http://localhost:3000/menus")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    var currentHeight = window.innerHeight;
    this.$refs["container"].style.height = currentHeight + "px";
    this.$refs["mainCanvas"].style.height = `calc(${currentHeight}px - 3rem)`;

    window.onresize = () => {
      currentHeight = window.innerHeight;
      this.$refs["container"].style.height = currentHeight + "px";
      this.$refs["mainCanvas"].style.height = `calc(${currentHeight}px - 3rem)`;
    };
  },
};
</script>