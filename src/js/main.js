import Vue from 'vue';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Common from '../component/common';
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';
import VueRouter from 'vue-router';
// 这个axios 如果在这导入，那么其他的模块想要使用 还要重新导入
import axios from 'axios';
// 为了解决这个问题 把axios对象添加到Vue的原型中去，那么其他模块也可以用这个 axios对象了
Vue.prototype.axios = axios;

// 导入过滤器
import Filter from '../filter'

// 导入全局样式，因为返回的数据当中 有自带img标签的图片 我们组件中带有 scoped 属性的样式 都是属性选择器， 选不中 这些自带img标签的图片
import style from '../style/index.css';

// 导入一个图片预览插件,这个插件是基于Vue的插件 要用use方法调用
import vuePicturePreview from 'vue-picture-preview';

import Vuex from 'vuex';

// mint-ui vue-router 都是vue的插件所有的vue插件都要用use方法启用，如果不是vue插件那就不用了
// use 主要调用文件里面的install方法并传入Vue对象
Vue.use(MintUi);
Vue.use(Common);
Vue.use(VueRouter);
Vue.use(Filter);
Vue.use(vuePicturePreview);
Vue.use(Vuex);

// 导入根组件
import AppComponent from '../component/App.vue';
// 导入路由配置对象
import routerConfig from '../component/router/index.js';
// 导入接口配置文件
import api from './api_config.js';
// 把接口对象添加到原型中去
Vue.prototype.api = api;

// 导入vuex 配置文件
import storeConfig from '../vuex/index.js';  // 会自动寻找该文件夹下的 index.js文件 然后注入

new Vue({
    el: '#app',
    render(createNode) {
        return createNode(AppComponent);
    },
    // 本来应该在这 写router: new VueRouter({}) 路由配置项的，
    // 但是模块化开发为了能够简洁一些还是放在router文件夹下的index.js下
    router: new VueRouter(routerConfig),
    // 注意这里的V 和 S 都是大写
    store: new Vuex.Store(storeConfig)
});