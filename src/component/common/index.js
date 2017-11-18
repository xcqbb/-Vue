// 导入组件语法：   自定义名  from  路径  
import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';
// vue提供的开发插件 的方法 install
// 参数1是： Vue的构造函数  
export default {
    install(Vue){
        Vue.component('app-header',HeaderComponent);
        Vue.component('app-footer',FooterComponent);
    }
};