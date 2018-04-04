import storage from '../js/storage';
import Vue from 'vue';
export default {
    state:{
        goodsBuyCount:storage.get('goodsBuyCount')||{}
    },
    // 凡是计算和获取数据 的方法 都写在这里面
    getters:{
        // 计算购买总数的方法
        getBuyTotal(state){
            return Object.values(state.goodsBuyCount).reduce((sum,val)=>sum+val,0)
        }
    },
    // 修改state中的状态值(数据)的方法都写在这里面
    mutations:{
        // 修改数据方法
        upBuyData(state,params){
            // 根据参数 修改state中的goodsBuyCount 还有storage中的修改goodsBuyCount
            // state.goodsBuyCount[params.id] = params.total;
            // 使用Vue.set而不是使用上面是因为 对象增加新的属性 使用 vue.set()  vue才能监听到，重而刷新视图
            Vue.set(state.goodsBuyCount,params.id,params.total);
            storage.set('goodsBuyCount',state.goodsBuyCount);
        },
        // 删除数据方法
        delBuyDate(state,params){
            Vue.delete(state.goodsBuyCount,params.id);
            storage.set('goodsBuyCount',state.goodsBuyCount);
        }
    }
}