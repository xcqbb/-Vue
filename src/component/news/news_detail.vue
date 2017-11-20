<template>
    <div>
        <h4>{{detail.title}}</h4>
        <div v-html="detail.content"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      jieko: "",
      detail: []
    };
  },
  methods: {
    getDetail() {
      this.axios.get(this.jieko).then(rsp => (this.detail = rsp.data.message[0]));
    }
  },
  created() {
    this.id = this.$route.params;
    // console.log(this.id);
    this.jieko = this.api.getND + this.id.id;
    console.log(this.jieko);
    this.getDetail();
  }
};
</script>

<style scoped>

</style>