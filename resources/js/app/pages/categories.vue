<template>
  <div>
    <spinner v-if="app.loading"></spinner>
    <div v-else>
      <category-search :app="app"></category-search>

      <div
        class="container"
        v-for="category in categories"
        v-bind:key="category.id"
        style="margin-bottom: 4px"
      >
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="card card-default">
              <div class="card-header">{{ category.title }}</div>

              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-center align-content-center"
                  style="height: 100px"
                  v-for="forum in category.fora"
                  v-bind:key="forum.id"
                >
                  <div style="width: 40%; display: inline-block">
                    <h5 style="line-height: 75px">
                      <router-link
                        :to="{ name: 'forum', params: { id: forum.id } }"
                      >
                        {{ forum.title }}
                      </router-link>
                    </h5>
                  </div>
                  <div
                    style="
                      width: 20%;
                      display: inline-block;
                      text-align: center;
                    "
                  >
                    <span style="line-height: 75px">
                      {{ forum.views }} /
                      <strong>{{ forum.replies }}</strong>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategorySearch from "../components/category-search";
export default {
  name: "categories",
  components: { CategorySearch },
  props: ["app"],
  data() {
    return {
      categories: null,
    };
  },

  filters: {
    friendlyDate(value) {
      return moment(value).fromNow();
    },
  },

  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      let $this = this;

      this.app.loading = true;

      this.app.request.get("categories").then(function (response) {
        $this.app.loading = false;
        $this.categories = response.data;
      });
    },
  },
};
</script>

<style scoped>
</style>