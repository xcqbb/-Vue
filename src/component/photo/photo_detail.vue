<template>
    <div>
        <!--  mui的卡片视图布局用的是flex 我们要把头部和底部改为block  -->
        <div class="mui-card">
				<div class="mui-card-header">
                    <h4>{{info.title}}</h4>
                    <p class="mui-ellipsis">
                    <span>创建时间: {{info.add_time | date}}</span>
                    <span class="lastspan">点击数:{{info.click}} </span>
                    </p>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <img v-for="item in images" v-bind:key="item.src" v-bind:src="item.src" v-preview="item.src">
                    </div>
				</div>
				<div class="mui-card-footer" v-html="info.content">
                </div>
		</div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                info:{},
                images:[]
            }
        },
        methods:{
            // 获取图片详情
            getImageInfo(){
                this.axios.get(this.api.photoD + this.$route.params.id).then(rsp=> {
                    console.log(rsp.data.message[0]);
                    this.info = rsp.data.message[0];
                    })
            },
            // 获取图片
            getImages(){
                this.axios.get(this.api.photoT + this.$route.params.id).then( rsp=> {
                    console.log(rsp.data.message);
                    this.images = rsp.data.message;
                } )
            }
        },
        created(){
            this.getImageInfo();
            this.getImages();
        }
    }
</script>

<style scoped>
.mui-card-header,.mui-card-footer {
  display: block;
  overflow: hidden;
}
.lastspan:last-child{
    float: right;
}
</style>