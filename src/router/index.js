/*
路由模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
// import MSite from '@/pages/MSite/MSite'
// import Order from '@/pages/Order/Order'
// import Search from '@/pages/Search/Search'
// import Profile from '@/pages/Profile/Profile'
import Login from '@/pages/Login/Login'
// import Shop from '@/pages/Shop/shop'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'


/**
 * 路由组件懒加载的方式进行加载--最外层顶级路由需要考虑这样进行加载
 * @returns {Promise<*>|*}
 * @constructor
 */
const MSite = ()=> import('@/pages/MSite/MSite')
const Search = ()=> import('@/pages/Search/Search')
const Shop = ()=> import('@/pages/Shop/Shop')
const Profile = ()=> import('@/pages/Profile/Profile')
const Order = ()=> import('@/pages/Order/Order')

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
	//所有路由
	routes:[
	{
		path:'/msite',
		component:MSite,
		meta:{
			showFooter:true
		}
	},
	{
		path:'/order',
		component:Order,
		meta:{
			showFooter:true
		}
	},
	{
		path:'/search',
		component:Search,
		meta:{
			showFooter:true
		}
	},
	{
		path:'/profile',
		component:Profile,
		meta:{
			showFooter:true
		}
	},
	{
		path:'/',
		redirect:'/msite',
		meta:{
			showFooter:true
		}
	},
	{
		path:'/login',
		component:Login,
		meta:{
			showFooter:false
		}
	},
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    }
	]
})
