<template>
	<div id="app">
		<router-view>

		</router-view>
		<FooterGuide v-show="$route.meta.showFooter"/>
	</div>
</template>

<script>
	import FooterGuide from '@/components/FooterGuide/FooterGuide'
	import {reqFoodTypes} from '@/api'
export default {
	name:'App',
	data(){
		return{

		}
	},
	components:{
		FooterGuide
	},
   mounted(){
		// const result = reqFoodTypes()
		// console.log(result)

     //调用vuex的action异步获取数据，然后将数据存储在vuex的state中，再通过mapstate将state中的值映射出来进行展示
    this.$store.dispatch('getAddress')
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
