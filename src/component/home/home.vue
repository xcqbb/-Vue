<template>
    <article>
        <mt-swipe :auto="4000">
            <!-- 这里如果只用v-for 那么可以看到会出红线提示，因为数据可能有很多条，如果数据发生变化Vue又要重新改变视图这样会非常消耗性能，所以这里要加上一个v-bind 给未来每一个动态渲染出来的元素添加一个标识，标识必须唯一不能重复，因为将来数据变化vue是拿着这个标识去找发生变化的元素然后在根据这个变化的元素做视图变化，所以重复就没意义了，这里说白了就是一个性能优化处理比重绘所有的视图会快一些 -->
            <mt-swipe-item v-for="item in lunbos" v-bind:key="item.id">
                <a v-bind:href="item.url">
                    <img v-bind:src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </article>
</template>

<script>
// day06 08 23分钟之后
    export default {
        data(){
            return {
                lunbos:[]
            }
        },
        methods:{
                getLunbo(){
                this.axios.get('http://vue.studyit.io/api/getlunbo').then( rep => this.lunbos = rep.data.message);
            }
        },
        created(){
                this.getLunbo();
        }
    }
    
</script>
// lang 就是告诉Vue你想使用那种方式编译css 这里就用的是less
// scoped 用了这个属性，那么在这里写的样式只会添加这个模块里的模板上，不会添加到其他组件的模板上。因为Vue在这做了一个属性选择器处理 在前面回加 data-v-faeffbf2然后选择器就变成了这样：
article a[data-v-faeffbf2] {
    display: inline-block;
    height: 100%;
}
<style lang="less" scoped>
article {
    height: 260px;
    a {
        display: inline-block;
        height: 100%;
        img {
            height: 100%;
        }
    }
}
</style>

