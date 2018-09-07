<template>
	<div class="msite">
				<!--首页头部-->
				<HeaderTop :title="address.name">
					<span slot="left" class="header_search">
						<i class="iconfont icon-sousuo"></i>
					</span>
					<span slot="right" class="header_login">
						<span class="header_login_text">登录|注册</span>
					</span>
				</HeaderTop>


				<!--首页导航-->
				<nav class="msite_nav">
					<div class="swiper-container" v-if="categoryArr.length">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(categorys,index) in categoryArr" :key="index">
								<a href="javascript:" class="link_to_food"  v-for="(category,index) of categorys" :key="index">
									<div class="food_container">
										<img :src="baseImageUrl + category.image_url">
									</div>
									<span>{{category.title}}</span>
								</a>
							</div>
						</div>
						<!-- Add Pagination -->
						<div class="swiper-pagination"></div>
					</div>
          <img src="./images/msite_back.svg" alt="back" v-else/>
				</nav>
				<!--首页附近商家-->
				<div class="msite_shop_list">
					<div class="shop_header">
						<i class="iconfont icon-xuanxiang"></i>
						<span class="shop_header_title">附近商家</span>
					</div>
					<ShopList>

					</ShopList>

				</div>
			</div>
</template>

<script>
	import Swiper from 'swiper'
	//引入swiper的css样式
	import 'swiper/dist/css/swiper.min.css'

	import HeaderTop from '@/components/HeaderTop/HeaderTop'
	import ShopList from '@/components/ShopList/ShopList'

  import {mapState} from 'vuex'

export default {
	name:'MSite',
	data(){
		return{
		  baseImageUrl : 'https://fuss10.elemecdn.com'
		}
	},
  computed:{
	  //使用mapstate将vuex中的state属性映射出来
	  ...mapState(['address','categorys']),

    //根据categorys一纬数组生成一个二维数组
    categoryArr(){
	    const {categorys} = this
      //向上取整获取页数
	    let pages = Math.ceil(categorys.length / 8)
      let arr = []
      for (var i = 0;i < pages;i ++){
	      let arr2 = []
	      for (var j = 0;j < 8;j ++){
	        if (categorys[j + 8*i]) {
            arr2[j] = categorys[j + 8*i]
          }

        }
        arr[i] = arr2
      }
      console.log(arr)

      return arr
    }
  },
	components:{
		HeaderTop,
		ShopList
	},
  watch:{

	  //数据更新之后会异步更新界面，所有创建swiper需要在列表显示之后，不然会有显示bug

    categorys(value){//categorys数组中有数据了，但再异步更新界面之前执行不可以！


      //this.$nextTick应该在修改数据之后立即调用，在dom更新完毕后，会自动执行this.$nextTick中的回调函数
      this.$nextTick(() =>{//一旦完成界面更新，立即调用(此条语句要写在数据更新之后)
        //创建一个swiper对象实现轮播
        new Swiper('.swiper-container',{
          loop:true,//可以循环轮播
          pagination:{
            el:'.swiper-pagination'
          }
        })
      })
    }
  },
	mounted(){


    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl"
	&.msite  //首页
		width 100%
		.header
			background-color #02a774
			position fixed
			z-index 100
			left 0
			top 0
			width 100%
			height 45px
			.header_search
				position absolute
				left 15px
				top 50%
				transform translateY(-50%)
				width 10%
				height 50%
				.icon-sousuo
					font-size 25px
					color #fff
			.header_title
				position absolute
				top 50%
				left 50%
				transform translate(-50%, -50%)
				width 50%
				color #fff
				text-align center
				.header_title_text
					font-size 20px
					color #fff
					display block
			.header_login
				font-size 14px
				color #fff
				position absolute
				right 15px
				top 50%
				transform translateY(-50%)
				.header_login_text
					color #fff
		.msite_nav
			bottom-border-1px(#e4e4e4)
			margin-top 45px
			height 200px
			background #fff
			.swiper-container
				width 100%
				height 100%
				.swiper-wrapper
					width 100%
					height 100%
					.swiper-slide
						display flex
						justify-content center
						align-items flex-start
						flex-wrap wrap
						.link_to_food
							width 25%
							.food_container
								display block
								width 100%
								text-align center
								padding-bottom 10px
								font-size 0
								img
									display inline-block
									width 50px
									height 50px
							span
								display block
								width 100%
								text-align center
								font-size 13px
								color #666
				.swiper-pagination
					>span.swiper-pagination-bullet-active
						background #02a774
		.msite_shop_list
			top-border-1px(#e4e4e4)
			margin-top 10px
			background #fff
			.shop_header
				padding 10px 10px 0
				.shop_icon
					margin-left 5px
					color #999
				.shop_header_title
					color #999
					font-size 14px
					line-height 20px

</style>
