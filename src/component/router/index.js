import HomeComponent from '../home/home.vue';
import NewsListComponent from '../news/news_list.vue';
import NewsDetailComponent from '../news/news_detail.vue';
import PhotoListComponent from '../photo/photo_list.vue';
import PhotoDetailComponent from '../photo/photo_detail.vue';

// 对外导出一个路由配置对象
export default {
    routes:[
        { path: "/",redirect:"/index"}, 
                    // path 的路径虽然是自己 随便定义的但是也要符合基本的命名标准
        { name:"i", path:"/index",component:HomeComponent},
        // 新闻页面路由
        { name:"nl", path:"/news/list",component:NewsListComponent},
        { name:"nd", path:"/news/detail/:id",component:NewsDetailComponent },
        // 图片页面路由
        { name:"pl", path:"/photo/list/:id",component:PhotoListComponent },
        { name:"pd", path:"/photo/detauls/:id",component:PhotoDetailComponent }
    ]
}