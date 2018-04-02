// 把所有的过滤器都导入在这个index.js 文件下，然后由main.js引入这个index.js这样就不用多次导入各种过滤器了
import DateFilter from './date.js';
// 在导出的时候 这个js文件中没有vue顶级对象  要使用install方法就必须传入参数 Vue对象
// 虽然这里没有Vue对象但是在main.js中会使用use方法，使用了use方法后 调用install方法并传入Vue对象 
export default {
    install(Vue){
        Vue.filter('date',DateFilter);
    }
}