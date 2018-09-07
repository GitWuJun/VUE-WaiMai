/*
直接更新state的多个方法对象
*/

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATERGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default{
	[RECEIVE_ADDRESS](state,{address}){
	  state.address = address
  },
  [RECEIVE_CATERGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
}
