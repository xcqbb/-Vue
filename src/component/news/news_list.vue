<template>
    <ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media" v-for="item in newsList" v-bind:key="item.id">
			<router-link v-bind="{to:`/news/detail/${item.id}`}">
				<img :src="item.img_url" class="mui-media-object mui-pull-left">
					<div class="mui-media-body mui-ellipsis">
					{{item.title}}
					<p class="mui-ellipsis">
                        <span>创建时间：{{ item.add_time | date }}</span>
                        <span>点击数：{{ item.click }}</span>
                    </p>
				</div>
			</router-link>
		</li>
    </ul>
    
</template>

<script>
    export default {
        data(){
            return {
                newsList:[]
            }
        },
        methods:{
            getNewsList(){
                this.axios.get(this.api.getNL).then( rsp => this.newsList = rsp.data.message )
            }
        },
        created() {
            this.getNewsList();
        }
    }
</script>

<style lang="less" scoped>
.mui-table-view {
    overflow: hidden;
    span:first-child{
        float: left;
    }
    span:last-child{
        float:right;
    }
}
</style>