import HomeComponent from '../home/home.vue';
import NewsListComponent from '../news/news_list.vue';
import NewsDetailComponent from '../news/news_detail.vue'
// 对外导出一个路由配置对象
export default {
    routes:[
        { path: "/",redirect:"/index"},
        { name:"i", path:"/index",component:HomeComponent},
        { name:"nl", path:"/news/list",component:NewsListComponent},
        { name:"nd", path:"/news/detail/:id",component:NewsDetailComponent }
    ]
}