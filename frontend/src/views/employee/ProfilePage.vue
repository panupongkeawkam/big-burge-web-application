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
              <div class="my-3 clickable">
                <span
                  class="d-flex flex-column justify-content-center align-items-center text-decoration-none"
                >
                  <i class="fas fa-user text-warning"></i>
                  <span
                    class="mt-2 text-light"
                    style="font-size: 12px !important; opacity: .75"
                  >PROFILE</span>
                </span>
              </div>
            </div>
            <div class="col py-3 px-4 d-flex flex-wrap" ref="mainCanvas">
              <div
                class="col-12 pb-5 d-flex align-items-center justify-content-between"
                ref="titleBar"
                style="height: 10%"
              >
                <div class="fw-bold text-theme-2 fs-1">Profile</div>
              </div>
              <div
                class="col-xxl-9 col-12 d-flex flex-column pe-3 pb-3"
                style="overflow: auto; height: 90%"
                ref="menusOverview"
              >
                <div
                  class="col-12 d-flex align-items-start flex-wrap bg-light shadow-sm p-4 py-5 pe-5 h-100"
                  style="border-radius: 1rem"
                >
                  <div class="col-4 fw-bold text-muted mb-2 d-flex flex-column px-3">
                    <div
                      class="border rounded-circle d-flex justify-content-center align-items-center bg-theme-4 m-3 mt-0"
                      style="height: 156px; width: 156px;"
                    >
                      <i class="fas fa-user-tie text-theme-3" style="font-size: 96px"></i>
                    </div>
                    <div class="px-2">
                      <div class="fs-3 fw-bold text-muted">{{ account.fname }} {{ account.lname }}</div>
                    </div>
                    <div class="px-2 mb-4">
                      <div
                        class="fw-bold"
                        style="color: hsl(0, 50%, 0%, 30%)"
                      >@{{ account.username }}</div>
                    </div>
                    <div class="col-xxl-8 col-10 d-flex flex-wrap p-2 mb-4">
                      <button
                        class="btn btn-outline-secondary border-2 w-100 fw-bold mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#changePasswordModal"
                      >
                        <i class="fas fa-key me-1"></i>
                        Change Password
                      </button>
                      <button
                        class="btn btn-danger fw-bold w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmLogoutModal"
                      >
                        <i class="fa-solid fa-right-from-bracket me-2" style="transform: scale(-1)"></i>
                        Logout
                      </button>
                    </div>
                  </div>
                  <div class="col-8 d-flex flex-wrap">
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-4 border me-2 mb-2"
                      style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                    >
                      <span
                        class="fw-bold text-muted"
                        style="font-size: 0.8em; opacity: 0.75"
                      >Gender</span>
                      <span class="fs-5 fw-bold text-muted">{{ toTitle(account.gender) }}</span>
                    </div>
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-4 border mb-2"
                      style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                    >
                      <span
                        class="fw-bold text-muted"
                        style="font-size: 0.8em; opacity: 0.75"
                      >Job Role</span>
                      <span class="fs-5 fw-bold text-muted">{{ roleFormat }}</span>
                    </div>
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-4 border me-2 mb-2"
                      style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                    >
                      <span
                        class="fw-bold text-muted"
                        style="font-size: 0.8em; opacity: 0.75"
                      >Salary</span>
                      <span class="fs-5 fw-bold text-muted">{{ account.salary }}</span>
                    </div>
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-4 border mb-2"
                      style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                    >
                      <span
                        class="fw-bold text-muted"
                        style="font-size: 0.8em; opacity: 0.75"
                      >Hire Date</span>
                      <span class="fs-5 fw-bold text-muted">{{ dateFormat(account.hire_date) }}</span>
                    </div>
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-4 border me-2 mb-2"
                      style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                    >
                      <span class="fw-bold text-muted" style="font-size: 0.8em; opacity: 0.75">Phone</span>
                      <span class="fs-5 fw-bold text-muted">{{ account.phone_number }}</span>
                    </div>
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-4 border mb-2"
                      style="border-radius: 1rem; width: calc(50% - 0.25rem)"
                    >
                      <span class="fw-bold text-muted" style="font-size: 0.8em; opacity: 0.75">Email</span>
                      <span class="fs-5 fw-bold text-muted">{{ account.email }}</span>
                    </div>
                    <div
                      class="d-flex flex-column px-4 pt-3 pb-5 border w-100"
                      style="border-radius: 1rem"
                    >
                      <span
                        class="fw-bold text-muted"
                        style="font-size: 0.8em; opacity: 0.75"
                      >Address</span>
                      <span class="fs-5 fw-bold text-muted">{{ account.address }}</span>
                    </div>
                  </div>
                  <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content border-0 shadow">
                        <div class="modal-header bg-theme-2 border-0">
                          <h5 class="modal-title fw-bold text-light">Change Password</h5>
                        </div>
                        <div class="modal-body px-4 border-0">
                          <div class="my-4">
                            <input
                              :type="showPassword ? 'text' : 'password'"
                              v-model="oldPassword"
                              placeholder="Old password"
                              class="form-control mb-3 p-3"
                              @input="validation()"
                            />
                            <div class="form-text text-success mb-2" v-show="matchOld">
                              <i class="fas fa-check me-2"></i>
                              Match old password
                            </div>
                            <div class="form-text text-danger mb-2" v-show="!matchOld">
                              <i class="fas fa-xmark me-2"></i>
                              Match old password
                            </div>
                          </div>
                          <div class="mb-4">
                            <input
                              :type="showPassword ? 'text' : 'password'"
                              v-model="newPassword"
                              placeholder="New password"
                              class="form-control mb-3 p-3"
                              @input="validation()"
                            />
                            <div class="form-text text-success mb-2" v-show="minimumLength">
                              <i class="fas fa-check me-2"></i>
                              Length 8 character
                            </div>
                            <div class="form-text text-danger mb-2" v-show="!minimumLength">
                              <i class="fas fa-xmark me-2"></i>
                              Length 8 character
                            </div>
                            <div class="form-text text-success mb-2" v-show="notFirstNum">
                              <i class="fas fa-check me-2"></i>
                              First character not a number or underscore
                            </div>
                            <div class="form-text text-danger mb-2" v-show="!notFirstNum">
                              <i class="fas fa-xmark me-2"></i>
                              First character not a number or underscore
                            </div>
                            <div class="form-text text-success mb-2" v-show="minimumAZ">
                              <i class="fas fa-check me-2"></i>
                              Has 3 a-z or A-Z character
                            </div>
                            <div class="form-text text-danger mb-2" v-show="!minimumAZ">
                              <i class="fas fa-xmark me-2"></i>
                              Has 3 a-z or A-Z character
                            </div>
                            <div class="form-text text-success mb-2" v-show="noSpecial">
                              <i class="fas fa-check me-2"></i>
                              No special character (#$\+? etc) except underscore (_)
                            </div>
                            <div class="form-text text-danger mb-2" v-show="!noSpecial">
                              <i class="fas fa-xmark me-2"></i>
                              No special character (#$\+? etc) except underscore (_)
                            </div>
                            <div class="form-text text-success mb-2" v-show="notSameOld">
                              <i class="fas fa-check me-2"></i>
                              Not same as old password
                            </div>
                            <div class="form-text text-danger mb-2" v-show="!notSameOld">
                              <i class="fas fa-xmark me-2"></i>
                              Not same as old password
                            </div>
                          </div>
                          <div
                            class="text-muted clickable"
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
                        <div class="modal-footer border-0">
                          <button
                            type="button"
                            class="btn btn-outline-secondary border-2 fw-bold"
                            data-bs-dismiss="modal"
                            @click="oldPassword = ''; newPassword = ''; validation()"
                          >Cancel</button>
                          <button
                            class="btn btn-warning fw-bold text-light border-2"
                            :style="{filter: `grayscale(${valid ? '0%' : '100%'})`}"
                            @click="saveEditPassword()"
                            :disabled="!valid"
                          >Save Changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal fade" id="confirmLogoutModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content border-0 shadow">
                        <div class="modal-header bg-theme-2 border-0">
                          <h5 class="modal-title fw-bold text-light">Confirm Logout</h5>
                        </div>
                        <div class="modal-body border-0">Are you sure to logout?</div>
                        <div class="modal-footer border-0">
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
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      account: null,
      showPassword: false,
      oldPassword: "",
      newPassword: "",
      matchOld: false,
      minimumLength: false,
      notFirstNum: false,
      minimumAZ: false,
      noSpecial: false,
      notSameOld: false,
      valid: false,
    };
  },
  methods: {
    toTitle(str) {
      return str[0].toUpperCase() + str.substr(1).toLowerCase();
    },
    dateFormat(dateStr) {
      const months = [
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
      var date = new Date(dateStr);
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    },
    validation() {
      var lower = /[a-z]/g;
      var upper = /[A-Z]/g;
      var numbers = /[0-9]/g;

      this.matchOld = this.oldPassword === this.account.password;

      this.noSpecial = this.newPassword !== "";
      this.notSameOld =
        this.newPassword !== "" && this.account.password !== this.newPassword;
      this.notFirstNum =
        this.newPassword !== "" &&
        !this.newPassword[0].match(numbers) &&
        this.newPassword[0] !== "_";
      this.minimumLength = this.newPassword.length >= 8;

      var charCount = 0;
      for (var c of this.newPassword) {
        if (c.match(lower) || c.match(upper)) {
          charCount = charCount + 1;
        }
        if (
          !(c.match(lower) || c.match(upper) || c.match(numbers) || c === "_")
        ) {
          this.noSpecial = false;
        }
      }

      this.minimumAZ = charCount >= 3;

      this.valid =
        this.matchOld &&
        this.minimumLength &&
        this.notFirstNum &&
        this.minimumAZ &&
        this.noSpecial &&
        this.notSameOld;
    },
    logout() {
      axios
        .delete("http://localhost:3000/manager/logout")
        .then(() => {
          this.$router.push("/manager/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveEditPassword() {
      this.validation();
      if (this.valid) {
        axios
          .put(
            `http://localhost:3000/account/${this.account.account_id}/password`,
            {
              password: this.newPassword,
            }
          )
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    roleFormat() {
      if (this.account.role.includes("_")) {
        return "Service Staff";
      }
      return this.toTitle(this.account.role);
    },
  },
  created() {
    this.account = this.$attrs.account;
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