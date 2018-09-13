/*
通过mutation间接更新state的多个方法对象

外部通过调用 this.$store.dispatch('方法名')来调用actions
或者通过映射函数 ...mapActions把方法映射出来进行调用
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATERGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

import {
  reqAddress,
  reqFoodTypes,
  reqShopList,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings
} from '../api'

export default{
	//异步获取地址
  async getAddress ({commit,state}){
    //发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result =  await reqAddress(geohash)
    //提交一个mutation,通过mutation改变state的值
    if (result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
	//异步获取食品分类数组列表
  async getCategorys ({commit}){
    //发送异步ajax请求
    const result =  await reqFoodTypes()
    //提交一个mutation
    if (result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATERGORYS,{categorys})
    }
  },
	//异步获取商家列表
  async getShops ({commit,state},){
    //发送异步ajax请求
    const {longitude,latitude} = state
    const result =  await reqShopList(longitude,latitude)
    //提交一个mutation
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if (result.code === 0){
      const userInfo = result.data
      console.log('==='+result)
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  //异步登出
  async logout({commit,state}){
    const result = await reqLogout()
    if (result.code === 0){
      const userInfo = result.data
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  //同步更新food中的count数量
  updataFoodCount({commit},{isAdd,food}){
    if (isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    } else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //同步清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  }

  // //同步更新购物车中的food
  // updataShopCartFood({commit},{isAdd,food}){
  //
  // }
}
