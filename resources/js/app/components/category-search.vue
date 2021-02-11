<template>
  <div class="container">
    <div
      class="jumbotron search-container justify-content-center"
      v-bind:style="{
        background: 'url(' + baseUrl + '/images/upt.jpg' + ')',

        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position-y': 'center',
        height: '500px!important',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "category-search",
  props: ["app"],
  data() {
    return {
      searchQuery: "",
      baseUrl: BASE_URL,
    };
  },

  methods: {
    onSubmit() {
      let $this = this;

      this.app.$router.push({
        name: "search",
        query: { query: $this.searchQuery },
      });
    },
  },
};
</script>

<style scoped>
.search-input {
  width: 10px;
  height: 30px;
  border: 3px rgb(247, 247, 247) #050507;
  background-color: rgb(247, 245, 244);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 20px;
  position: inherit;
}

.search-container {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  position: inherit;
}
</style>