<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{info.description}}</span>
            <span>由商家配送提供配送，约 {{info.deliveryTime}} 分钟送达，距离 {{info.distance}}m</span>
          </div>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div class="activity-item" :class="supportClasses[support.type]" v-for="(support,index) in info.supports"
               :key="index">
<span class="content-tag">
<span class="mini-tag">{{support.name}}</span>
</span>
            <span class="activity-content">{{support.content}}</span>
          </div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picUl">
            <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
              <img width="120" height="90"
                   :src="pic"/>
            </li>

          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li><span class="bold">品类</span> <span>{{info.category}}</span></li>
          <li><span class="bold">商家电话</span> <span>{{info.phone}}</span></li>
          <li><span class="bold">地址</span> <span>{{info.address}}</span></li>
          <li><span class="bold">营业时间</span> <span>{{info.workTime}}</span></li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    name: "ShopGoods",
    data() {
      return {
        supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
      }
    },
    computed: {
      ...mapState(['info'])
    },

    created(){
      //@!!!!解决vue页面刷新后原先获取的vuex中state消失的问题--https://blog.csdn.net/goodaxuan/article/details/82113123

      //vue单页应用在页面刷新时保存状态数据的解决方案--https://blog.csdn.net/aliven1/article/details/80743470

      //在页面加载时读取sessionStorage里的状态信息

//       if (sessionStorage.getItem("store") ) {
//
//         this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
//
//       }
//
//
//
// //在页面刷新时将vuex里的信息保存到sessionStorage里
//
//       window.addEventListener("beforeunload",()=>{
//
//         sessionStorage.setItem("store",JSON.stringify(this.$store.state))
//
//       })
    },
    mounted() {

      //getShopInfo获取商家数据是异步获取的，所以有可能_initScroll的时候info中还没有值，所以需要监听info的值，当有数据的时候再进行创建
      //但从别的路由跳转到该路由的时候,info是有值的，所以可以直接在mounted中进行创建
      //如果数据还没有，直接结束
      if (!this.info.name){
        return
      }

      this._initScroll()

    },
    watch:{
      //info有值才会去创建bscroll对象
      info(){//刷新流程，更新数据
        console.log('info有值了')
        this.$nextTick(()=>{
          this._initScroll()
        })
      }
    },
    methods:{
      _initScroll(){
        //数据有了，可以创建bscroll对象形成滑动

        new BScroll('.shop-info', {
          click: true
        })

        //bscroll能滑动的前提是--被bscroll所包裹的div要比bscroll更长或更宽
        //计算ul宽度并赋值
        const ul = this.$refs.picUl
        const liWidth = 120
        const space = 6
        const count = this.info.pics.length
        ul.style.width = (liWidth + space) * count -space+'px'
        new BScroll('.pic-wrapper', {
          scrollX: true,//设置成水平滑动
          click: true
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .shop-info
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px

      .activity
        margin-top 16px
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            border-radius 2px
            width 36px
            height: 18px
            margin-right 10px
            color #fff
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        margin-top 16px
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
      .detail
        margin-bottom -16px
        > li
          display flex
          justify-content space-between
          align-items center
          margin-right -10px
          padding 16px 12px 16px 0
          line-height 16px
          bottom-border-1px(#ddd)
          font-size 13px
          > .bold
            font-weight 700
            color #333
          &:last-child
            border-none()

    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
</style>
