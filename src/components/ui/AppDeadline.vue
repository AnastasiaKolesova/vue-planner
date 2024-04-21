<template>
	<div :class="['card__deadline', {'text-danger': isRed}]">Дэдлайн: {{ new Date(deadline).toLocaleDateString()  }}</div>
</template>

<script>
export default {
	props: {
		deadline: {
			type: String
		}
	},
	computed: {
		isRed () {
			const timeMS = new Date(this.deadline).getTime() - Date.now()
			const timeDay = Math.round(timeMS/ (60 * 60 * 24 * 1000)) 
			return timeDay <= 3
		}
	}
}
</script>

<style>

</style>