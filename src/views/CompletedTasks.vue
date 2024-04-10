<template>

	<div class="container with-nav">
		<app-loader v-if="isLoader"></app-loader>
		<div v-else v-for="task in tasks" :key="task.id" class="card mt-2"> 
			<h4>{{task.title}}</h4>

			<div class="bold">Дэдлайн: 
				{{ new Date(task.deadline).toLocaleDateString() }}
			</div>

			<app-status :type="task.statusTask" ></app-status>

			<div class="pt-1">Описание: {{task.description}}</div>

			<div class="pt-1">Приоритетность: {{ (task.importance === 'current') ?  'Текущая' : 'Приоритетная' }}
			</div>

			<div class="pt-1">Дата постановки задачи: {{ new Date(task.date).toLocaleDateString()}}</div>
		
			<button  class="btn mt-2" @click="resumeTask(task.id)" >Возобновить задачу</button>
		</div>
	</div>

</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppStatus from '@/components/ui/AppStatus.vue'


export default {
	setup() {
		const store = useStore()
		const router = useRouter()
		const isLoader = ref(true)

		
		onMounted (async () => {
			isLoader.value = true
			await store.dispatch('completed/setCompletedTasks')  
			isLoader.value = false
		})
		
		const tasks = computed( () => store.getters['completed/tasksCompleted'])

		async function resumeTask (id) {
			const myTask = tasks.value.find( t => t.id === id )
			myTask.statusTask = 'awaits'
			await store.dispatch('request/createTask', myTask)
			await store.dispatch('completed/deleteTask', id)
			router.push('/')
		}

		return {
			isLoader,
			tasks,
			resumeTask
		}

		

	},
	components: { 
		AppLoader, AppStatus,
	}
}
</script>

<style>

</style>