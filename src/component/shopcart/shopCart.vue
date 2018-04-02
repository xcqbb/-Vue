<template>
  <article class="shopcart-list">

    <!-- 商品列表 -->
    <div class="goods" v-for="item in buyGoodsList" v-bind:key="item.id">
      <!-- 这个mt-switch组件是Mint ui中的组件 他可以使用v-model绑定一个变量 这个变量的值是布尔值
       当前这里使用v-model就相当与往 每个item对象中都添加了一个isSelected属性 -->
      <mt-switch class="switch" v-model="item.isSelected"></mt-switch> <img class="img" v-bind:src="item.thumb_path">
      <div class="inforight">
        <h4 class="mui-ellipsis-2"> {{item.title}} </h4>
        <div class="bottom">
          <ul>
            <li>￥{{item.sell_price}}</li>
            <li>
              <!-- 数字输入框组件 -->
              <app-numbox v-bind:initVal="buyGoodsData[item.id]" @change="modifyBuyData(item.id,$event)"></app-numbox>
            </li>
            <li>
              <!-- 这里有个坑 那就是不可以用delete运算符 
                  这是因为 在vue中使用delete运算符删除数据，vue是监听不到的 只能监听到值的修改变化
                  新增和删除 是监听不到的，这也是我们要在data中存储数据 不预定义这些数据 我们也能操作它，但是视图就不会跟着刷新了。
                  如果非要删除 那么就要用vue中专门提供的$delete才行
              -->
              <a href="javascript:void(0)" @click="delGoods(item.id)">删除</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 总价 -->
    <div class="total">
      <div class="total_val">
        <ul>
          <li>总计（不含运费）</li>
          <!-- 使用计算computed中的方法直接 把他当成属性用就完事了 -->
          <li>已勾选商品{{selectedGoodsTotal}}件,总价:￥{{selectedGoodsPriceTotal}}元</li>
        </ul>
      </div>
      <div class="total_btn">
        <mt-button type="primary">付 款</mt-button>
      </div>
    </div>

  </article>
</template>

<script>
import storage from '../../js/storage.js';
export default {
  data(){
    return{
      buyGoodsList:[],
      buyGoodsData:storage.get('goodsBuyCount')
    }
  },
  methods:{
    // 获取购物车列表数据的方法
    getBuyGoodsList(){
      let ids = Object.keys(storage.get('goodsBuyCount')).join(',');
      this.axios.get(this.api.shopcL+ids)
      .then(rsp=>{
        // 其实Mint ui提供的组件使用v-model绑定的属性会动态添加到buyGoodsList中，但是这个属性的值是false
        // 我们想要的是true 那么就不得不去改了，所以这里用遍历的方式 改变 每一项的属性的值为true
        rsp.data.message.forEach(good=>good.isSelected=true);
        this.buyGoodsList = rsp.data.message;
        });
      // console.log(this.buyGoodsList);
    },

    // 为了页面上 总价格和总件数 能随时更新就不用这个方法了 
    // computed中reduce API中直接获取的是watch监听的buyGoodsData的值
    // // 获取本地存储中id对应的购买数量的方法
    // getBuyCountById(id){
    //   return  storage.get('goodsBuyCount')[id] ;
    // },

    // 根据 子组件 传过来的 参数 而修改 内存中的数据 
    modifyBuyData(id,val){
      // console.log(id,val);
      this.buyGoodsData[id] = val;
      // console.log(this.buyGoodsData);
    },
    // 根据id删除 商品的方法
    delGoods(id){
      // delte this.buyGoodsData[id]  这样删除是无效的
      this.$delete(this.buyGoodsData,id);
      // filter过滤器的意思  也就把不符合 回调函数中规定 的一项给删除掉
      // 这里没有第一项参数 过滤器名 直接用回调也行
      this.buyGoodsList = this.buyGoodsList.filter(v=>v.id!=id);
    }
  },
  created(){
    this.getBuyGoodsList();
  },
  watch: {
    buyGoodsData:{
      handler(){
        // console.log('监听到buyGoodsData发生了变化');
        storage.set('goodsBuyCount',this.buyGoodsData);
      },
      deep:true
    }
  },
  computed:{

    // 计算 已勾选商品的总件数
    // selectedGoodsTotal(){
    //   // 遍历购物车列表 判断每项的isSelected属性是否为true 如果是true那就把他对应的购买数量加上
    //   let sum = 0;
    //   this.buyGoodsList.forEach( good => {
    //     if(good.isSelected){
    //       sum += this.getBuyCountById(good.id);
    //       // console.log(sum);
    //     }
    //   });
    //   return sum; // 千万别写在循环遍历里面喽 注意层级
    // },

    // 计算 已勾选商品总件数的 第二种方案 使用reduce  API
    selectedGoodsTotal(){
      // 指定sum为0 good就是buyGoodsList中的每一项
      return this.buyGoodsList.reduce( (sum,good) => {
        // good的isSelected属性的值 是否为true? 如果是那么执行第一句 如不是那么执行第二句，第二句的意思就是sum不变
        return good.isSelected?sum+=this.buyGoodsData[good.id]:sum;
      },0 );
    },

    // 计算 已勾选商品的总价格
    // selectedGoodsPriceTotal(){
    //   // 遍历购物车列表 判断每项的isSelected属性是否为true
    //   // 如果为true获取 每件的总数量 * 商品单价
    //   let sum = 0;
    //   this.buyGoodsList.forEach( good => {
    //     if(good.isSelected){
    //       sum += this.getBuyCountById(good.id) * good.sell_price;
    //     }
    //   } );
    //   return sum;
    // }

    // 计算 已勾选商品的总价格 的第二种方案 使用reduce  API
    selectedGoodsPriceTotal(){
      return this.buyGoodsList.reduce((sum,good)=>{
        // console.log(this.getBuyCountById(good.id));
        return good.isSelected?sum += this.buyGoodsData[good.id] * good.sell_price : sum;
      },0);  
    }

  },
}

</script>

<style lang="less">
  .shopcart-list {
    .goods {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      height: 102px;
      display: flex;
      padding: 5px;
      .switch {
        flex: 0 0 52px;
      }
      .img {
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
      }
      .inforight {
        margin-left: 5px;
        flex: 1;
      }
      .inforight ul {
        padding-left: 0px;
      }
      .inforight li {
        list-style: none;
        display: inline-block;
      }
      .inforight h4 {
        color: #0094ff;
        font-size: 14px;
      }
      .bottom li:first-child {
        color: red;
        margin-right: 5px;
      }
      .bottom li:last-child {
        margin-left: 5px;
      }
    }
    .total {
      height: 84px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      padding: 5px 14px;
      ul {
		    padding-left: 0px;
		    margin: 14px 0;
		    li {
		      list-style: none;
		      font-size: 14px;
		    }
		  }
		  &_val {
		  	flex: 1;
		  }
		  &_btn {
		  	flex: 0 0 60px;
	      margin: 18px 0 0 0;
		  }
    }
  }
</style>