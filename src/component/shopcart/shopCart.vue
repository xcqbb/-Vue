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
              <div class="mui-numbox"> <button class="mui-btn mui-btn-numbox-minus">-</button> <input class="mui-input-numbox" type="number"> <button class="mui-btn mui-btn-numbox-plus">+</button> </div>
            </li>
            <li>
              <a href="javascript:void(0)">删除</a>
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
      buyGoodsList:[]
    }
  },
  methods:{
    // 获取购物车列表数据的方法
    getBuyGoodsList(){
      let ids = Object.keys(storage.get('goodsBuyCount')).join(',');
      this.axios.get(this.api.shopcL+ids)
      .then(rsp=>this.buyGoodsList = rsp.data.message);
      console.log(this.buyGoodsList);
    },
    // 获取本地存储中id对应的购买数量的方法
    getBuyCountById(id){
      return storage.get('goodsBuyCount')[id];
    }
  },
  created(){
    this.getBuyGoodsList();
  },
  computed:{
    // 计算 已勾选商品的总件数
    selectedGoodsTotal(){
      // 遍历购物车列表 判断每项的isSelected属性是否为true 如果是true那就把他对应的购买数量加上
      let sum = 0;
      this.buyGoodsList.forEach( good => {
        if(good.isSelected){
          sum += this.getBuyCountById(good.id);
          // console.log(sum);
        }
      });
      return sum; // 千万别写在循环遍历里面喽 注意层级
    },
    // 计算 已勾选商品的总价格
    selectedGoodsPriceTotal(){
      // 遍历购物车列表 判断每项的isSelected属性是否为true
      // 如果为true获取 每件的总数量 * 商品单价
      let sum = 0;
      this.buyGoodsList.forEach( good => {
        if(good.isSelected){
          sum += this.getBuyCountById(good.id) * good.sell_price;
        }
      } );
      return sum;
    }
  }
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