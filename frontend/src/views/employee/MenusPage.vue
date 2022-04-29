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
                <router-link
                  class="d-flex flex-column justify-content-center align-items-center text-decoration-none"
                  to="/manager/tables"
                >
                  <i class="fas fa-table-cells text-light"></i>
                  <span
                    class="mt-2 text-light"
                    style="font-size: 12px !important; opacity: .75"
                  >TABLES</span>
                </router-link>
              </div>
              <div class="my-3 clickable">
                <span class="d-flex flex-column justify-content-center align-items-center">
                  <i class="fas fa-burger text-warning"></i>
                  <span
                    class="mt-2 text-light"
                    style="font-size: 12px !important; opacity: .75"
                  >MENUS</span>
                </span>
              </div>
              <div class="my-3 clickable">
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
                  v-if="sortedMenus.length === 0"
                  class="w-100 h-100 d-flex justify-content-center align-items-center fs-2 fw-bold text-muted"
                  style="opacity: .5"
                >No Result</div>
                <div
                  class="col-12 bg-light shadow-sm py-3 pe-4 mb-3"
                  style="border-radius: 1rem"
                  v-for="(menu, index) in sortedMenus"
                  :key="'menu' + menu.menu_id"
                >
                  <div class="d-flex justify-content-between">
                    <div class="col-3 d-flex justify-content-evenly align-items-center">
                      <div class="form-check form-switch" v-if="editingMenuIndex === index">
                        <input
                          class="form-check-input border-secondary"
                          :class="{'bg-success': editMenu.status}"
                          :style="{filter: `brightness(${editMenu.status ? '150%' : '100%'})`}"
                          type="checkbox"
                          @click="editMenu.status = !editMenu.status"
                          :checked="editMenu.status"
                        />
                      </div>
                      <span v-show="editingMenuIndex !== index">
                        <span v-show="menu.menu_status === 'ready'">
                          <i
                            class="fas fa-circle mx-2 me-3"
                            style="color: #31d475; font-size: .8em"
                          ></i>
                        </span>
                        <span v-show="menu.menu_status === 'not_ready'">
                          <i
                            class="fas fa-circle mx-2 me-3"
                            style="color: #bc2c3b; font-size: .8em"
                          ></i>
                        </span>
                      </span>
                      <div style="height: 128px; position: relative">
                        <div v-if="editingMenuIndex === index">
                          <img
                            class="rounded"
                            :class="{'border border-danger': error.editImageFile}"
                            :src="editMenu.imageURL"
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
                          :src="menu.image_file_path ? `http://localhost:3000/${menu.image_file_path}` : 'http://localhost:3000/image-not-found.png'"
                          style="height: 128px; width: 128px; object-fit: cover"
                          v-else
                        />
                      </div>
                    </div>
                    <div class="col-6 d-flex flex-wrap">
                      <div class="col-12 p-2">
                        <input
                          class="form-control m-0 fs-5 p-2 fw-bold"
                          :class="{'is-invalid': error.editName}"
                          v-model="editMenu.name"
                          placeholder="Name"
                          :style="{color: `hsl(208, 7%, 46%, ${editMenu.name === '' ? '50%' : '100%'}) !important`}"
                          type="text"
                          v-if="editingMenuIndex === index"
                        />
                        <div class="fs-5 p-2 fw-bold text-muted" v-else>{{ menu.menu_name }}</div>
                      </div>
                      <div class="col-4 p-2">
                        <input
                          class="form-control m-0 p-2 fs-5 fw-bold text-theme-3"
                          :class="{'is-invalid': error.editPrice}"
                          v-model="editMenu.price"
                          placeholder="Price"
                          type="number"
                          v-if="editingMenuIndex === index"
                        />
                        <div class="p-2 fw-bold fs-5 text-theme-3" v-else>{{ menu.menu_price }}฿</div>
                      </div>
                      <div class="col-4 p-2" style="color: #fc8845">
                        <input
                          class="form-control m-0 p-2 fs-5 fw-bold"
                          :class="{'is-invalid': error.editDiscount}"
                          style="color: #fc8845"
                          v-model="editMenu.discount"
                          placeholder="Discount"
                          type="number"
                          v-if="editingMenuIndex === index"
                        />
                        <div
                          class="p-2 fw-bold fs-5"
                          style="white-space: nowrap"
                          v-if="editingMenuIndex !== index && menu.member_price"
                        >
                          {{ menu.member_price }}฿
                          <i class="fas fa-tag ms-2"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-3 d-flex flex-column align-items-end justify-content-between">
                      <span
                        class="clickable"
                        v-show="editingMenuIndex !== index"
                        @click="editing(menu); editingMenuIndex = index"
                      >
                        <i class="fas fa-pen text-muted fs-5"></i>
                      </span>
                      <span
                        class="clickable"
                        v-show="editingMenuIndex === index"
                        @click="editingMenuIndex = -1; error.editName = false; error.editPrice = false; error.editDiscount = false; error.editImageFile = false"
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
                          @click="deleteMenu.name = menu.menu_name; deleteMenu.id = menu.menu_id"
                        >Delete</button>
                      </div>
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
                      <input
                        type="text"
                        class="form-control py-3 px-4"
                        :class="{'is-invalid': error.newName}"
                        v-model="newMenu.name"
                        placeholder="Name"
                      />
                    </div>
                    <div class="col-6 mb-3 pe-3">
                      <input
                        type="number"
                        class="form-control py-3 px-4"
                        :class="{'is-invalid': error.newPrice}"
                        v-model="newMenu.price"
                        placeholder="Price"
                      />
                    </div>
                    <div class="col-6 mb-4">
                      <input
                        type="number"
                        class="form-control py-3 px-4"
                        :class="{'is-invalid': error.newDiscount}"
                        v-model="newMenu.discount"
                        placeholder="Discount (optional)"
                      />
                    </div>
                    <div class="mb-3 fw-bold text-muted">Menu Image</div>
                    <div>
                      <input
                        type="file"
                        class="form-control"
                        :class="{'is-invalid': error.newImageFile}"
                        accept="image/*"
                        @change="chooseNewImage"
                      />
                    </div>
                    <div
                      class="col-12 mt-3"
                      v-if="newMenu.imageFile && this.newMenu.imageFile.type.includes('image')"
                    >
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
                        @click="addNew()"
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
            <button
              type="button"
              class="btn btn-danger fw-bold"
              data-bs-dismiss="modal"
              @click="confirmDelete()"
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
        imageURL: "",
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
    },
    chooseEditImage() {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        this.editMenu.imageFile = e.target.files[0];
        this.editMenu.imageURL = this.imageDecode(e.target.files[0]);
      };

      input.click();
    },
    addNew() {
      this.newMenu.name = this.newMenu.name.trim();
      this.newMenu.price = parseFloat(this.newMenu.price);
      this.newMenu.discount = parseFloat(this.newMenu.discount);

      this.error.newName = this.newMenu.name === "";
      this.error.newPrice =
        isNaN(this.newMenu.price) || this.newMenu.price <= 0;
      this.error.newDiscount =
        this.newMenu.discount <= 0 ||
        this.newMenu.discount >= this.newMenu.price;
      this.error.newImageFile =
        !this.newMenu.imageFile ||
        !this.newMenu.imageFile.type.includes("image");

      if (
        !this.error.newName &&
        !this.error.newPrice &&
        !this.error.newDiscount &&
        !this.error.newImageFile
      ) {
        var formData = new FormData();
        formData.append("image", this.newMenu.imageFile);
        formData.append("menu_name", this.newMenu.name);
        formData.append("menu_price", this.newMenu.price);
        formData.append(
          "member_price",
          isNaN(this.newMenu.discount) ? null : this.newMenu.discount
        );

        axios
          .post(`http://localhost:3000/menu`, formData)
          .then((res) => {
            this.menus.push(res.data.menu);
            this.newMenu.name = "";
            this.newMenu.price = "";
            this.newMenu.discount = "";
            this.newMenu.imageFile = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    editing(menu) {
      this.editMenu.id = menu.menu_id;
      this.editMenu.name = menu.menu_name;
      this.editMenu.price = menu.menu_price;
      this.editMenu.discount = menu.member_price || "";
      this.editMenu.status = menu.menu_status === "ready";
      this.editMenu.imageURL = menu.image_file_path
        ? `http://localhost:3000/${menu.image_file_path}`
        : "http://localhost:3000/image-not-found.png";
      this.editMenu.imageFile = "";
    },
    saveEdit() {
      this.editMenu.name = this.editMenu.name.trim();
      this.editMenu.price = parseFloat(this.editMenu.price);
      this.editMenu.discount = parseFloat(this.editMenu.discount);

      this.error.editName = this.editMenu.name === "";
      this.error.editPrice =
        isNaN(this.editMenu.price) || this.editMenu.price <= 0;
      this.error.editDiscount =
        this.editMenu.discount <= 0 ||
        this.editMenu.discount >= this.editMenu.price;
      this.error.editImageFile =
        typeof this.editMenu.imageFile === "object" &&
        !this.editMenu.imageFile.type.includes("image");

      if (
        !this.error.editName &&
        !this.error.editPrice &&
        !this.error.editDiscount &&
        !this.error.editImageFile
      ) {
        var formData = new FormData();
        formData.append("image", this.editMenu.imageFile);
        formData.append("menu_name", this.editMenu.name);
        formData.append("menu_price", this.editMenu.price);
        formData.append(
          "menu_status",
          this.editMenu.status ? "ready" : "not_ready"
        );
        formData.append(
          "member_price",
          isNaN(this.editMenu.discount) ? null : this.editMenu.discount
        );

        axios
          .put(`http://localhost:3000/menu/${this.editMenu.id}`, formData)
          .then((res) => {
            var targetMenu = this.menus.find(
              (val) => val.menu_id === this.editMenu.id
            );
            var menu = res.data.menu;
            targetMenu.menu_name = menu.menu_name;
            targetMenu.menu_price = menu.menu_price;
            targetMenu.member_price = menu.member_price;
            targetMenu.menu_status = menu.menu_status;
            if (menu.image_file_path) {
              targetMenu.image_file_path = menu.image_file_path;
            }
            this.editingMenuIndex = -1;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    confirmDelete() {
      axios
        .delete(`http://localhost:3000/menu/${this.deleteMenu.id}`)
        .then((res) => {
          if (res.status === 200) {
            var targetIndex = this.menus.findIndex(
              (val) => val.menu_id === this.deleteMenu.id
            );
            this.menus.splice(targetIndex, 1);
            this.editingMenuIndex = -1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    sortedMenus() {
      var menus = this.menus.concat([]);
      if (this.sortBy === "recent") {
        menus.sort((a, b) => (a.menu_id > b.menu_id ? -1 : 1));
      } else if (this.sortBy === "alphabetAsc") {
        menus.sort((a, b) => (a.menu_name < b.menu_name ? -1 : 1));
      } else if (this.sortBy === "alphabetDesc") {
        menus.sort((a, b) => (a.menu_name > b.menu_name ? -1 : 1));
      } else if (this.sortBy === "priceAsc") {
        menus.sort((a, b) => (a.menu_price < b.menu_price ? -1 : 1));
      } else if (this.sortBy === "priceDesc") {
        menus.sort((a, b) => (a.menu_price > b.menu_price ? -1 : 1));
      }
      return menus.filter((val) =>
        val.menu_name
          .toLowerCase()
          .includes(this.searchQuery.trim().toLowerCase())
      );
    },
  },
  created() {
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