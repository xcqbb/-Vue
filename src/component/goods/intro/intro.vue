<template>
    <div class="mui-card">
		<div class="mui-card-header">
            {{ intro.title }}
        </div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner" v-html="intro.content">
                    <!-- v-html中解析出来的标签加样式 要在全局中添加才能生效
                        因为这些正常的标签写样式的选择器 都会变成div[xxxx]的属性选择器
                     -->
                </div>
			</div>
	</div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      intro: {}
    };
  },
  methods: {
    // 调用图文介绍接口，但是要父组件传递数据id
    getIntro() {
      this.axios.get(this.api.goodsD + this.id).then(
          rsp => this.intro = rsp.data.message[0]
      );
    }
  },
  created() {
    this.getIntro();
  }
};
</script>

<style scoped>

</style>