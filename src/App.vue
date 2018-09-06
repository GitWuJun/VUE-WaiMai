<template>
	<div id="app">
		<router-view>
			
		</router-view>
		<FooterGuide v-show="$route.meta.showFooter"/>
	</div>
</template>

<script>
	import FooterGuide from '@/components/FooterGuide/FooterGuide'
export default {
	name:'App',
	data(){
		return{

		}
	},
	components:{
		FooterGuide
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>