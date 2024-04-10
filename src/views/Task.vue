<template>
	<!-- <div class="container with-nav"> -->
		<router-link to="/"> Все задачи</router-link>
		<app-loader v-if="isLoader"></app-loader>
		<div v-else class="card mt-1"> 
			<form @submit.prevent="updateTask">
				<h4>
					{{myTask.title}}
				</h4>

				<div v-if="isRedact" class="form-control">
					<label for="deadline">Дата дэдлайна</label>
					<input type="date" id="deadline" v-model="deadline" v-bind="deadlineAttrs">
						<small class="text-danger">{{ errors.deadline }}</small>
				</div>

				<app-deadline v-else :deadline="myTask.deadline"></app-deadline>

				<div v-if="isRedact" class="form-control">
					<label for="statusTask">Статус:</label>
					<select name="statusTask" id="statusTask" v-model="statusTask" v-bind="statusTaskAttrs">
						<option value="awaits">Ожидает</option>
						<option value="at-work">В работе</option>
						<option value="canceled">Отменена</option>
					</select>
				</div>

				<app-status v-else :type="myTask.statusTask" ></app-status>

				<div v-if="isRedact" class="form-control">
					<label for="description">Описание:</label>
					<textarea name="description" type="text" id="description" v-model="description" v-bind="descriptionAttrs"></textarea>
				</div>
				<div v-else class="pt-1">Описание: {{myTask.description}}</div>

				<div v-if="isRedact" class="form-control">
					<label for="importance">Приоритетность:</label>
					<select name="importance" id="importance" v-model="importance" v-bind="importanceAttrs">
						<option value="current">Текущая</option>
						<option value="priority">Приоритетная</option>
					</select>
					<small class="text-danger">{{ errors.importance }}</small>
				</div>
				<div v-else class="pt-1">Приоритетность: {{ (myTask.importance === 'current') ?  'Текущая' : 'Приоритетная' }}
				</div>

				<div class="pt-1">Дата постановки задачи: {{ new Date(myTask.date).toLocaleDateString()}}</div>
				
				<div v-if="isRedact" class="mt-2">
					<button class="btn primary">Обновить задачу</button>
					<button class="btn danger" @click.prevent="cancelChanges">Отменить изменения</button>
				</div>
				<div v-else class="mt-2">
					<button class="btn primary" @click="completeTask">Завершить задачу</button>
					<button class="btn" @click="redact">Редактировать</button>
					<button class="btn danger" @click="deleteTask">Удалить</button>
				</div>
			</form>
		</div>
	<!-- </div> -->
</template>

<script>
import { ref, onMounted, } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import { useForm } from 'vee-validate';
import * as yup from 'yup';

import AppStatus from '@/components/ui/AppStatus.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppDeadline from '@/components/ui/AppDeadline.vue'

export default {

	setup() {
		const route = useRoute()
		const router = useRouter()
		const store = useStore()
		const taskId = ref(route.params.taskId)
		const myTask = ref({})
		const isLoader = ref(true)
		const isRedact = ref(false)

		const { values, errors, defineField, handleSubmit } = useForm({
			validationSchema: yup.object({
				deadline: yup.date().nullable().typeError('Установите дату дедлайна').required('Установите дату дедлайна'),
				importance: yup.string().required('Обозначьте важность задачи'),
				description: yup.string().trim(),
				statusTask: yup.string().trim()
			}),
		});

		const [deadline, deadlineAttrs] = defineField('deadline');
		const [importance, importanceAttrs] = defineField('importance');
		const [description, descriptionAttrs] = defineField('description');
		const [statusTask, statusTaskAttrs] = defineField('statusTask');
	

		onMounted (async () => {
			isLoader.value = true
			myTask.value = await store.dispatch('request/setMyTask', taskId.value)	
			isLoader.value = false
		})

		function deleteTask () {
			store.dispatch('request/deleteTask', taskId.value)
			router.push('/')
		}  

		function redact () {
			isRedact.value = true
			statusTask.value = myTask.value.statusTask
			description.value = myTask.value.description
			deadline.value = myTask.value.deadline
			importance.value = myTask.value.importance
		}

		 const updateTask = handleSubmit (async values => {
			const editedTask = {
				...values, title: myTask.value.title, date: myTask.value.date
			}
			const data = {...editedTask, id:taskId.value}
			await store.dispatch('request/updateTask', data)
			isRedact.value = false
			myTask.value.statusTask = statusTask.value
			myTask.value.description = description.value
			myTask.value.deadline = deadline.value
			myTask.value.importance = importance.value
		})

		async function completeTask () {
			myTask.value.statusTask = 'completed'
			await store.dispatch('completed/completeTask', myTask.value)
			deleteTask()
		}

		function cancelChanges () {
			isRedact.value = false
		}
				
		return {
			myTask,
			isLoader,
			deleteTask,
			redact,
			isRedact,
			completeTask,
			updateTask,
			cancelChanges,
			errors,
			statusTask,
			statusTaskAttrs,
			description,
			descriptionAttrs,
			deadline,
			deadlineAttrs,
			importance,
			importanceAttrs,
		}
	},
	components: {
		AppStatus, AppLoader, AppDeadline,
	}
}
</script>

<style>

</style>