/*
通过mutation间接更新state的多个方法对象

外部通过调用 this.$store.dispatch('方法名')来调用actions
或者通过映射函数 ...mapActions把方法映射出来进行调用
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATERGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodTypes,
  reqShopList
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
  }

}
