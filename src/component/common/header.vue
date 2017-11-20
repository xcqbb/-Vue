<template>
    <header>
        <mt-header fixed title="饿了吗？">
            <!-- 添加一个返回按钮，并添加判断只有在非首页的页面才会出现，然后给这个返回按钮注册一个事件，使用$router的go方法-1就是返回上一页 -->
                <mt-button icon="back" slot="left" v-if="$route.path != '/index'" v-on:click="$router.go(-1)"></mt-button>
        </mt-header>
        <i></i>
    </header>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
header i {
    display: block;
    height: 40px;
}
</style>
