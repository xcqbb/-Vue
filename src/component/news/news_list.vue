<template>
    <ul class="mui-table-view">
        <!-- <li v-for="item in newsList" v-bind:key="item.id"> -->
                <!-- 
                    原来的 v-bind:to="/news/detail/" + item.id 这样写是不行的
                    所以用vue的新语法发让bind可以添加一个对象，我们这里主要是为了拼接id
                 -->
            <!-- <router-link v-bind="{to:`/news/detail/${item.id}`}">
                <p>{{item.zhaiyao}}</p>
            </router-link>
        </li> -->

		<li class="mui-table-view-cell mui-media" v-for="item in newsList" v-bind:key="item.id">
			<router-link v-bind="{to:`/news/detail/${item.id}`}">
				<img :src="item.img_url" class="mui-media-object mui-pull-left">
					<div class="mui-media-body">
					{{item.title}}
					<p class="mui-ellipsis">
                        <span>{{ item.add_time | date }}</span>
                        <span>{{ item.click }}</span>
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

<style scoped>
.mui-table-view {
    margin-bottom: 50px;
}
</style>