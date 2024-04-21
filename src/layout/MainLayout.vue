<template>
	<the-navbar></the-navbar>
	<div class="wrapper block">
		<div class="block__container _container">
			<app-message></app-message>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import AppMessage from '../components/ui/AppMessage'

export default {
	components: { 
		TheNavbar, AppMessage,
	}
}
</script>

<style>

</style>