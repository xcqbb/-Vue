<template>
  <article class="goods-detail">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbos" v-bind:key="item.src">
              <img v-bind:src="item.src" alt="">
        </mt-swipe-item>
    </mt-swipe>
  	<!-- 商品购买 -->
    <div class="mui-card">
      <!-- 名称 -->
      <div class="mui-card-header">{{goodsPrice.title}}</div>
      <!-- 价格 -->
      <div class="mui-card-content mui-card-content-inner">
        <div class="price"> <s>市场价:￥{{goodsPrice.market_price}}</s> <span>销售价: </span> <em>￥{{goodsPrice.sell_price}}</em> </div>
        <div> <span>购买数量：</span>
          <!--数字输入框组件-->
          <app-numbox v-bind:initVal="buyCount" @change="getTotal"></app-numbox>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="mui-card-footer">
      	<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">结算</button>
        <div></div>
        <button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="addShopcart">加入购物车</button>
      </div>
    </div>

		<!-- 评论与介绍 -->
		<div class="mui-card">
      <!-- 
        下面的选项卡和内容都是mint-ui里的标签 实现tab栏功能
        这个标签内部封装好了点击切换功能
        这里用 v-model进行双向数据绑定 当前用来绑定一个变量对应下面的一个id，点击时会返回id 改变tab对应的值
        这是内部已经封装好的方法，我们直接data中为v-model随便绑定一个对应的id就好了 其它不用管
       -->
			<!-- 选项卡 -->
		  <mt-navbar v-model="tab">
			  <mt-tab-item id="tab-container1">商品评论</mt-tab-item>
			  <mt-tab-item id="tab-container2">图文介绍</mt-tab-item>
			</mt-navbar>
			<!-- 内容 -->
		  <mt-tab-container v-model="tab">
			  <mt-tab-container-item id="tab-container1">
			    <mt-cell title="商品评论"></mt-cell>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="tab-container2">
			    <mt-cell title="图文介绍">
            <app-intro v-bind:id="id"></app-intro>
          </mt-cell>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>

  </article>
</template>

<script>
// 引用子组件文件  并且还要components中注册才能使用
import IntroComponent from './intro/intro.vue';
import storage from '../../js/storage.js';
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbos: [],
      goodsPrice: {},
      tab:"tab-container1",
      buyCount:0
      // 数据回显  也可以这样写哦
      // buyCount:(storage.get('goodsBuyCount')||{})[this.$route.params.id] || 0
    };
  },
  methods: {
    // 获取商品缩略图的方法
    getGoodsThumList() {
      this.axios
        .get(this.api.goodsT + this.id)
        .then(rsp => {this.lunbos = rsp.data.message;
          console.log(this);
        });
    },
    // 获取商品价格信息
    getGoodsPrice() {
      this.axios
        .get(this.api.goodsP + this.id)
        .then(rsp => (this.goodsPrice = rsp.data.message[0]));
    },
    getTotal(total) {
      this.buyCount = total;
    },
    addShopcart(){
      // 因为程序读写的原因  写文件是把整个文件清空再写(也就是覆盖)，而不是在内容的末尾添加所以这里要借助一个第3方变量
      // 把本地存储的对象取出来存进变量中，如没有那就存入一个空对象
      let oldBuyData =  storage.get('goodsBuyCount') || {};
      // 然后再把 当前这次购买的商品id和数量添加到变量中
      oldBuyData[this.id] = this.buyCount;
      // 然后再把这个变量写入 这个本地存储的对象中
      storage.set('goodsBuyCount',oldBuyData);
    },
    TheEchoData(){ // 数据回显，如果用户离开了该商品详情页后又想修改商品数量，点回商品详情页那么会发现数字输入框中的数字不是他上次选择的购买数量
      let BuyData = storage.get('goodsBuyCount') || {}; 
      this.buyCount = BuyData[this.id];
      // 空对象[id] 是 undefined 为了避免这种情况所以得判断一下
      this.buyCount == undefined?this.buyCount = 1:this.buyCount;
    }
  },
  created() {
    this.getGoodsThumList();
    this.getGoodsPrice();
    this.TheEchoData();
  },
  // 注册子组件
  components:{
    'app-intro':IntroComponent
  }
};
</script>

<style lang="less">
  .goods-detail {
    .mui-card-content {
      .price {
        color: rgb(51, 51, 51);
        margin-bottom: 4px;
        span {
          margin-left: 6px;
        }
        em {
          font-size: 18px;
          color: red;
        }
      }
    }
    .mui-card-footer {
      div {
        width: 100%;
      }
      .mui-btn {
        padding: 8px 0;
        font-size: 16px;
      }
    }
    .mint-tab-item {
    	&.is-selected {
    		margin-bottom: 0;
    		border-bottom: 3px solid #2ce094;
    		color: #2ce094;
    	}
    }
    .mint-tab-item-label {
    	font-size: 18px;
    	color: #2ce094;
    }
  }
.mint-swipe {
  height: 260px;
  background-color: #fff;
  img {
    height: 100%;
    width: 260px;
    display: block;
    margin: 0 auto;
  }
}
.mint-tab-item-label {
  font-size: 16px;
}
</style>