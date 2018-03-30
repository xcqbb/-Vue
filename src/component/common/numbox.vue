<template>
    <!--数字输入框 -->
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" v-on:click="sub" >-</button>
          	<input class="mui-input-numbox" type="number" v-model="val">
        <button class="mui-btn mui-btn-numbox-plus" v-on:click="add">+</button>
    </div>
</template>

<script>
    export default {
        props:['initVal'],
        data(){
            return {
                val:this.initVal||0
            }
        },
        methods:{
            sub(){
                // 短路运算中&& 是找假   
                // 只有第一句是真的情况才会执行第二句，如果第一句为假那么他就已经找到了，无论如何不会执行第二句
                this.val>0 && this.val--;
            },
            add(){
                this.val++;
            }
        },
        watch: {
            val(){
                this.$emit('change',this.val);
            }
        }
    }
</script>

<style scoped>

</style>