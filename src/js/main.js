import Vue from 'vue';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Common from '../component/common';
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';

Vue.use(MintUi);
Vue.use(Common);

import AppComponent from '../component/App.vue';

new Vue({
    el:'#app',
    render(createNode){
        return createNode(AppComponent);
    }
});