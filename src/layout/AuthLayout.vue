<template>
	<div class="container">
		<app-message></app-message>
		<router-view></router-view>
	</div>
	
</template>

<script>
import Auth from '../views/Auth'
import AppMessage from '../components/ui/AppMessage'

export default {
	components: { 
		Auth, 
		AppMessage,
	}
}
</script>

<style>

</style>