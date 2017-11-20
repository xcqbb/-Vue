<template>
    <div>

        <div class="mui-card">
				<div class="mui-card-header">
          <h4>{{detail.title}}</h4>
           <p class="mui-ellipsis">
            <span>创建时间: {{ detail.add_time | date }}
            </span>
            <span>点击数: {{ detail.click }}</span>
          </p>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-html="detail.content">
					</div>
				</div>
				<div class="mui-card-footer">
         
        </div>
			</div>

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
.mui-ellipsis {
  overflow: hidden;
}
.mui-card-header,.mui-card-footer {
  display: block;
}

span:last-child{
  float: right;
}


</style>