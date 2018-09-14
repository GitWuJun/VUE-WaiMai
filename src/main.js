/**
入口js
*/

import Vue from 'vue'
import App from './App.vue'

import router from './router'

//重置浏览器标签的样式表
import '../static/css/reset.css'
//解决移动端3ms延迟--需要先执行安装库的命令--npm install fastclick -D
import FastClick from 'fastclick'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer.js'  //加载mockserver即可

import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

//加载过滤器
import './filters'

FastClick.attach(document.body)



//注册全局组件标签
Vue.component(Button.name,Button)

//使用vueload对图片进行懒加载
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

let vm = new Vue({
	el: '#app',
	render: h => h(App),
	router,//使用上vue-router
  store,
})

Vue.use({
	vm
})
