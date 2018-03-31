import HomeComponent from '../home/home.vue';
import NewsListComponent from '../news/news_list.vue';
import NewsDetailComponent from '../news/news_detail.vue';
import PhotoListComponent from '../photo/photo_list.vue';
import PhotoDetailComponent from '../photo/photo_detail.vue';
import GoodsListComponent from '../goods/goods_list.vue';
import GoodsDetailComponent from '../goods/goods_detail.vue';
import Shopcart from '../shopcart/shopCart.vue';

// 对外导出一个路由配置对象
export default {
    // 创建新的组件就要配置的路由里来
    routes:[
        { path: "/",redirect:"/index"}, 
        // name的值 一定得是 字符串 引用的时候也得是引用 npm 字符串 
        // path 路径虽然是自己随便定义的但是也要符合基本的命名标准           
        { name:"i", path:"/index",component:HomeComponent},
        // 新闻页面路由
        { name:"nl", path:"/news/list",component:NewsListComponent},
        { name:"nd", path:"/news/detail/:id",component:NewsDetailComponent },
        // 图片页面路由
        { name:"pl", path:"/photo/list/:id",component:PhotoListComponent },
        { name:"pd", path:"/photo/detail/:id",component:PhotoDetailComponent },
        // 商品相关页面的路由
        { name:"gl", path:"/goods/list",component:GoodsListComponent },
        { name:"gd", path:"/goods/detail/:id",component:GoodsDetailComponent },
        // 购物车相关页面的路由
        { name:"sc", path:"/shopcart",component:Shopcart }
    ]
}