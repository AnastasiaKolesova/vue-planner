<template>
  <div class="alert warning" v-if="message">
		<p>{{message.value}}</p>
		<span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
	setup() {
		const store = useStore()
		const message = computed( () => store.getters.message)

		return {
			message,
			close: () => store.commit('clearMessage')
		}
	},

}
</script>

<style>

</style>