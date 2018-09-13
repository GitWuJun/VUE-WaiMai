/*
直接更新state的多个方法对象
*/
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATERGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO, RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT, CLEAR_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATERGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if (!food.count) {//只有有值才去减
      // food.count = 1   //新增属性(没有数据绑定)

      /**
       * 对象
       * 属性名
       * 属性值
       */
      Vue.set(food, 'count', 1)  //让新增的属性也有数据绑定

      state.cartFoods.push(food)

    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count--
      if (!food.count) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    //清除food中的count--值为0
    state.cartFoods.forEach(food => {
      if (food.count !== 0) {
        food.count = 0
      }
    })
    //清除购物车中的foods
    state.cartFoods = []

  }
}
