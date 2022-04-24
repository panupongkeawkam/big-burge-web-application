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
                <router-link to="/manager/menus">
                  <i class="fas fa-burger text-light"></i>
                </router-link>
              </div>
              <div class="my-3 clickable">
                <i class="fas fa-user text-warning"></i>
              </div>
            </div>
            <div class="col py-3 px-4 d-flex flex-wrap" ref="mainCanvas">
              <div
                class="col-12 pb-5 d-flex align-items-center justify-content-between"
                ref="titleBar"
                style="height: 10%"
              >
                <div class="fw-bold text-theme-2 fs-1">Profile</div>
                <button
                  class="btn btn-danger fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmLogoutModal"
                >
                  <i class="fa-solid fa-right-from-bracket me-2" style="transform: scale(-1)"></i>
                  Logout
                </button>
              </div>
              <div
                class="col-xxl-8 col-xl-10 col-12 d-flex flex-column pe-3 pb-3"
                style="overflow: auto; height: 90%"
                ref="menusOverview"
              >
                <div
                  class="col-12 d-flex flex-wrap bg-light shadow-sm p-4 py-5 pe-5"
                  style="border-radius: 1rem"
                >
                  <div class="col-12 fw-bold text-muted mb-3 d-flex justify-content-center">
                    <div
                      class="border rounded-circle d-flex justify-content-center align-items-center bg-theme-4 mb-4"
                      style="height: 196px; width: 196px;"
                    >
                      <i class="fas fa-user-tie text-theme-3" style="font-size: 128px"></i>
                    </div>
                  </div>
                  <div class="col-12 d-flex mb-4 fs-5">
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">First Name</div>
                    <div class="col-4 text-muted border-bottom p-2">Panupong</div>
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Last Name</div>
                    <div class="col-4 text-muted border-bottom p-2">Keawkam</div>
                  </div>
                  <div class="col-12 d-flex mb-4">
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Gender</div>
                    <div class="col-4 text-muted border-bottom p-2">Male</div>
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Job Role</div>
                    <div class="col-4 text-muted border-bottom p-2">Service Staff</div>
                  </div>
                  <div class="col-12 d-flex mb-4">
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Salary</div>
                    <div class="col-4 text-muted border-bottom p-2">25000.00</div>
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Hire Date</div>
                    <div class="col-4 text-muted border-bottom p-2">22 December 2021</div>
                  </div>
                  <div class="col-12 d-flex mb-4">
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Phone</div>
                    <div class="col-4 text-muted border-bottom p-2">098-xxx-xxxx</div>
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Email</div>
                    <div class="col-4 text-muted border-bottom p-2">63070132@it.kmitl.ac.th</div>
                  </div>
                  <div class="col-12 d-flex mb-5">
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Address</div>
                    <div class="col-10 text-muted border-bottom p-2">900/30 Bangpee Bangkok</div>
                  </div>
                  <div class="col-12 d-flex mb-4">
                    <div class="col-2 fw-bold text-theme-3 ps-3 p-2">Account Name</div>
                    <div class="col-4 text-muted border-bottom p-2">panupongkeawkam</div>
                  </div>
                  <div class="col-12 d-flex ps-3 mb-4">
                    <button
                      class="btn btn-info text-light fw-bold"
                      data-bs-toggle="modal"
                      data-bs-target="#changePasswordModal"
                    >
                      <i class="fas fa-key me-1"></i>
                      Change password
                    </button>
                  </div>
                  <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title fw-bold text-muted">Change Password</h5>
                        </div>
                        <div class="modal-body px-4">
                          <div class="my-4">
                            <input
                              :type="showPassword ? 'text' : 'password'"
                              v-model="oldPassword"
                              placeholder="Old Password"
                              class="form-control"
                            />
                          </div>
                          <div class="mb-4">
                            <input
                              :type="showPassword ? 'text' : 'password'"
                              v-model="newPassword"
                              placeholder="New Password"
                              class="form-control"
                            />
                          </div>
                          <div
                            class="mb-4 text-muted clickable"
                            style="font-size: .8em"
                            @click="showPassword = !showPassword"
                          >
                            <span v-show="showPassword">
                              <i class="fas fa-eye-slash"></i>
                            </span>
                            <span v-show="!showPassword">
                              <i class="fas fa-eye"></i>
                            </span>
                            {{ showPassword ? 'Hide' : 'Show' }} password
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-secondary border-2 fw-bold"
                            data-bs-dismiss="modal"
                          >Cancel</button>
                          <button class="btn btn-warning fw-bold text-light border-2" @click="saveEditPassword()">Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal fade" id="confirmLogoutModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title fw-bold text-muted">Confirm Logout</h5>
                        </div>
                        <div class="modal-body">Are you sure to logout?</div>
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
// import axios from "axios";

export default {
  data() {
    return {
      showPassword: false,
      oldPassword: "gg12345",
      newPassword: "",
    };
  },
  methods: {
    logout() {},
    saveEditPassword() {},
  },
  created() {},
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