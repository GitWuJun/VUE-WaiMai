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

FastClick.attach(document.body)

let vm = new Vue({
	el: '#app',
	render: h => h(App),
	router
})

Vue.use({
	vm
})