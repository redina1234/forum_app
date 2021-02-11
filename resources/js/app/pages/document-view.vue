<template>
  <div class="container">
    <div id="document"></div>
  </div>
</template>

<script>
import mammoth from "mammoth";

export default {
  name: "document-view",
  props: ["app"],
  mounted() {
    mammoth
      .convertToHtml({
        path: `../docs/${this.app.$route.params.document}.docx`,
      })
      .then(function (result) {
        console.log(result);
        document.getElementById("document").innerHTML = result.value;
      });
  },
};
</script>