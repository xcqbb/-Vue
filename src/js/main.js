import Vue from 'vue';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Common from '../component/common';
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';
// 这个axios 如果在这导入，那么其他的模块想要使用 还要重新导入
import axios from 'axios';
// 为了解决这个问题 把axios对象添加到Vue的原型中去，那么其他模块也可以用这个 axios对象了
Vue.prototype.axios = axios;
Vue.use(MintUi);
Vue.use(Common);


import AppComponent from '../component/App.vue';

new Vue({
    el:'#app',
    render(createNode){
        return createNode(AppComponent);
    }
});