<template>
    <main>
        <!-- 引入这个插件的占位标签 <lg-preview></lg-preview> ，官方演示虽然是把这个标签放在最后，但是我们的app-footer是绝对定位占据底部的位置所以会把他挡住，因此我们把他放在最上面，然后在需要 预览的图片上 放置他的指令v-preview="img" :src="路径" 如果是用 v-bind绑定的img标签 那么就在v-bind旁边写 v-preview="路径" -->
        <lg-preview></lg-preview>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </main>
</template>
<script>
    export default {

    }
</script>
<style scoped>

</style>
