<template>
    <article>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <router-link v-bind:to="{name:'pl',params:{id:0}}">全部</router-link> 
                </li>
			<li v-for="item in photoCategoryList" v-bind:key="item.id" class="mui-table-view-cell">
                <router-link v-bind:to="{name:'pl',params:{id:item.id}}">{{ item.title }}</router-link>
            </li>
		</ul>
        <div class="mui-card" v-for="item in photeList" v-bind:key="item.id">
			<router-link v-bind:to="{name:'pd',params:{id:item.id}}">
                <div class="mui-card-header mui-card-media" v-bind="{style:`height:40vw;background-image:url(${item.img_url})`}"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{item.title}}</p>
						<p style="color: #333;">{{item.zhaiyao}}</p>
					</div>
				</div>
            </router-link>
		</div>
    </article>
</template>

<script>
    export default {
        data(){
            return {
                photoCategoryList:[],
                photeList:[]
            }
        },
        methods:{
            // 获取头部列表导航
            getPhotoCategoryList(){
                console.log(this.api.photoC);
                this.axios.get(this.api.photoC).then( rsp => this.photoCategoryList = rsp.data.message );
            },
            // 获取图文列表
            getPhotoList(){
                console.log(this.$route);
                this.axios.get(this.api.photoL + this.$route.params.id ).then( rsp => this.photeList = rsp.data.message );
            }
        },
        // 在组件初始化后执行一次，所以点击router-link不会跳转页面，也就是说点击后并没有发送新的请求因为这里的生命周期函数(钩子函数)只会执行一次
        created() {
            this.getPhotoCategoryList();
            this.getPhotoList();
        },
        /* 因为生命周期函数的这个特点不会再执行，所以在监听中写新的代码，监听url的变化如果变化了发送对应的请求,这样配合router-link标签发送对应的请求就能够实现点击 链接 获取新的数据 并渲染到视图
        */
        watch:{
            $route(){
            //因为上面拼接是使用 + this.$route.params.id 实时获取新的id，所以不用改直接调用就是了 
                this.getPhotoList(); 
            }
        }
    }
</script>

<style lang="less" scoped>
.mui-table-view {
    overflow: hidden;
    li {
        float: left;
        color: deepskyblue;
        font-size: 14px;
    }
}
.mui-table-view-cell:after {
    height: 0px;
}
</style>