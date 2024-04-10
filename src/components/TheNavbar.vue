<template>
	<teleport to="body">
		<new-task :isModal="isModal" @close="isModal = false" ></new-task>	
	</teleport>
  <nav class="navbar">
	  <h3><router-link to="/">Планнер</router-link></h3>

		<ul class="navbar-menu">
			<li>
				<button class="btn" href="#" @click.prevent="modalShow">Создать задачу</button>
			</li>
			<li>
				<router-link to="/">На главную</router-link>
			</li>
			<li>
				<router-link to="/completed">Завершенные</router-link>
			</li>
			<li>
				<a href="#" @click.prevent="logout">Выход</a>
			</li>
		</ul>
  </nav>	
</template>

<script>
import { ref } from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import NewTask from '../views/NewTask.vue'

export default {

	setup() {
		const store = useStore()
		const router = useRouter()
		const isModal = ref(false)

		function modalShow () {
			isModal.value = true
		}

		return {
			isModal,
			modalShow,
			logout: () => {
				store.commit('auth/logout')
				store.state['request/tasks'] = []

				router.push('/auth')
			}
		} 
	},
	components: {
		NewTask,
	}
}
</script>

<style>

</style>