<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <form v-on:submit.prevent="onSubmit">
        <input
          class="search-input"
          placeholder="kerkoni..."
          v-model="searchQuery"
        />
        <button class="my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'categories' }" class="nav-link"
              >Fakulteti</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'njoftime' }" class="nav-link"
              >Njoftime</router-link
            >
          </li>
          <li class="nav-item">
            <!-- Duhet edhe ketu name bachelor qe -->
            <router-link :to="{ name: 'bachelor' }" class="nav-link"
              >Bachelor</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'master' }" class="nav-link"
              >Master</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'kerkimi-shkencor' }" class="nav-link"
              >Kerkimi Shkencor</router-link
            >
            <!-- Pse i ke bere keshtu? -->
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span v-if="app.user">{{ app.user.name }}</span>
              <span v-else>Llogaria</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <div v-if="!app.user">
                <router-link :to="{ name: 'login' }" class="dropdown-item"
                  >Login</router-link
                >
                <router-link :to="{ name: 'register' }" class="dropdown-item"
                  >Register</router-link
                >
              </div>
              <a
                href="javascript:void(0)"
                v-else
                class="dropdown-item"
                @click="logout"
                >Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: ["app"],
  data() {
    return {
      searchQuery: "",
      searchModel: "",
      threads: [],
      baseUrl: BASE_URL,
      currentPage: this.app.$route.query.page ? this.app.$route.query.page : 1,
      lastPage: 0,
      gotResults: null,
    };
  },
  mounted() {
    this.search();
  },
  filters: {
    friendlyDate(value) {
      return moment(value).fromNow();
    },
  },

  methods: {
    search(page) {
      this.threads = 0;
      this.lastPage = 0;

      if (page) {
        this.currentPage = page;
      }

      let $this = this;

      this.app.loading = true;

      this.app.request
        .get(
          "thread/search/" +
            this.app.$route.query.query +
            "?page=" +
            this.currentPage
        )
        .then(function (response) {
          $this.app.loading = false;

          if (response.data.data.length) {
            $this.threads = response.data.data;
            $this.lastPage = response.data.last_page;
            $this.app.$pagination.currentPage = 1;
            $this.gotResults = true;
          } else {
            $this.gotResults = false;
          }
        });
    },
    logout() {
      let $this = this;

      this.app.loading = true;

      this.app.request.post("auth/logout").then(function (response) {
        $this.app.loading = false;

        if (response.data === true) {
          $this.app.user = null;
          $this.app.$router.push({ name: "categories" });
        }
      });
    },
  },
};
</script>
<style scoped>
.navbar {
  background-color: rgb(0, 0, 0) !important;
}
</style>
