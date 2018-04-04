<template>
  <div>
      <nav class="mui-bar mui-bar-tab">
          <!-- mui-active 这个类名会给底部导航中 加上一个蓝色的样式
                需求是： 点击底部导航中哪个 哪个就会加上这个样式
                我们在 路由配置中 touter/index.js 中加了一个配置项 
                这个配置项 会随着 router-link地址变换而修改类名 ，所以这里所有的to属性都得不同
           -->
        <router-link class="mui-tab-item" to="/index">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" v-bind:to="{name:'gl'}">
            <span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
            <span class="mui-tab-label">商品购买</span>
        </router-link>
        <router-link class="mui-tab-item" v-bind:to="{name:'sc'}">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getBuyTotal}}</span></span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/setting">
            <span class="mui-icon mui-icon-gear"></span>
            <span class="mui-tab-label">设置</span>
        </router-link>
    </nav>
    <i></i>
  </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>

div i {
    display: block;
    height: 50px;
}
</style>
