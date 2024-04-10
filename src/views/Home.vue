<template>
	<app-loader v-if="isLoader"></app-loader>
	<div class="card" v-if="!tasks.length">У вас нет активных задач. Добавьте новую задачу с помощью кнопки "Создать задачу" в верхнем меню</div>
	<div v-else class="column-container">
		<div class="column-block">
			<h3 class="column-title">Приоритетные задачи</h3>
			<div class="card" v-for="t in tasksPriority" :key="t.title"> 
				<h4>{{t.title}}</h4>

				<app-deadline :deadline="t.deadline" ></app-deadline>

				<button class="btn primary mt-1" @click="openTask(t.id)">Открыть</button>
			</div>
		</div>

		<div class="column-block">
			<h3 class="column-title">Текущие задачи</h3>
			<div class="card" v-for="task in tasksCurrent" :key="task.title"> 
				<h4>{{task.title}}</h4>

				<app-deadline :deadline="task.deadline" ></app-deadline>

				<button class="btn primary mt-1" @click="openTask(task.id)">Открыть</button>
			</div>
		</div>
		
		<div class="column-block">
			<h3 class="column-title">Напоминания</h3>
			<!-- <div class="card" v-for="task in tasksCurrent" :key="task.title"> 
				<h4>{{task.title}}</h4>
			</div> -->
			<div class="card"> 
				<h4>Этот раздел находится в разработке</h4>
			</div> 
			<button class="reminder mt-1">Добавить</button>
		</div>
		
	</div>

</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppDeadline from '../components/ui/AppDeadline.vue'
import AppLoader from '@/components/ui/AppLoader.vue'


export default {
	setup() {
		const store = useStore()
		const router = useRouter()
		const isLoader = ref(true)

		onMounted (async () => {
			isLoader.value = true
			await store.dispatch('request/setTasks')  
			isLoader.value = false
		})
		
		const tasks = computed( () => store.getters['request/tasks'])
		const tasksPriority = computed( () => tasks.value.filter( t => t.importance === 'priority' )) 
		const tasksCurrent = computed( () => tasks.value.filter( t => t.importance === 'current' )) 

		function openTask(id) {
			router.push('task/' + id)
		}

		return {
			tasks,
			close,
			tasksPriority,
			tasksCurrent,
			openTask,
		}

	},
	components: { 
		AppDeadline, AppLoader
	}
}
</script>

<style>

</style>