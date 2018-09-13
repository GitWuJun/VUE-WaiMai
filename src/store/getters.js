/*
包含多个基于state的getter计算属性对象
*/

//如果需要计算的值是和state中的属性值有关的，则需要在getters中进行计算

export default {

  //计算购物车中商品总数
  totalCount(state) {
    //对cartFoods是否为空对象进行判断
    // if (Object.keys(state.cartFoods).length === 0) {
    //   return 0
    // } else {
    //   return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    // }
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)


  },

  //计算购物车中商品总数
  totalPrice(state) {
    //对cartFoods是否为空对象进行判断
    // if (Object.keys(state.cartFoods).length === 0) {
    //   return 0
    // }
    // return state.cartFoods.reduce((prePrice, food) => prePrice + food.price * food.count, 0)
    return state.cartFoods.reduce((prePrice, food) => prePrice + food.price * food.count, 0)

  },

  // //计算还差多少可以起送
  // shortPrice(state){
  //   return state.info.deliveryPrice-this.totalPrice(state)
  // },
}
