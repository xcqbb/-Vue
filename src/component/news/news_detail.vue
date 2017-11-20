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
      detail: {}
    };
  },
  methods: {
    getDetail() {
      // 以前是在created里拼接字符串，但是这个是生命周期函数只会执行一次，所以我们选择在 这里直接拼接
      this.axios.get(this.api.getND + this.$route.params.id).then( rsp => this.detail = rsp.data.message[0] )
    }
  },
  created() {
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