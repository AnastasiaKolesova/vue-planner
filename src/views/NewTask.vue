<template>
	<div v-if="isModal">
		<div class="modal-backdrop" @click="close"></div>
		<div class="modal">
			<div class="modal__header">
				<h2 class="modal__title">Создание новой задачи</h2>
				<div class="modal__close" @click="close">X</div>
			</div>
			
			<form @submit.prevent="createTask">

				<div class="form-custom">
					<label for="name">Название задачи*</label>
					<input type="text" id="name" v-model="title" v-bind="titleAttrs">
					<small class="text-danger">{{ errors.title }}</small>
				</div>
				<div class="form-custom">
					<label for="deadline">Дата дэдлайна*</label>
					<input type="date" id="deadline" v-model="deadline" v-bind="deadlineAttrs">
					<small class="text-danger">{{ errors.deadline }}</small>
				</div>
				<div class="form-custom">
					<label for="description">Описание задачи</label>
					<textarea name="description" type="text" id="description" v-model="description" v-bind="descriptionAttrs"></textarea>
				</div>
				<div class="form-custom">
					<label for="importance">Приоритетнось задачи*</label>
					<select name="importance" id="importance" v-model="importance" v-bind="importanceAttrs">
						<option value="current">Текущая</option>
						<option value="priority">Приоритетная</option>
					</select>
					<small class="text-danger">{{ errors.importance }}</small>
				</div>
				<div class="form-custom">
					<label for="statusTask">Статус</label>
					<select name="statusTask" id="statusTask" v-model="statusTask" v-bind="statusTaskAttrs">
						<option value="awaits">Ожидает</option>
						<option value="at-work">В работе</option>
						<option value="canceled">Отменена</option>
						<option value="completed">Завершена</option>
					</select>
				</div>
				<button class="btn primary">Создать</button>
			</form>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';


export default {
	emits: ['close'],
	props: ['isModal'],
	setup(props, context) {
		const store = useStore()
		const router = useRouter()

		const { values, errors, defineField, handleSubmit, resetForm } = useForm({
			validationSchema: yup.object({
				title: yup.string().trim().required('Поле заголовка не может быть пустым'),
				deadline: yup.date().required('Установите дату дедлайна'),
				importance: yup.string().required('Обозначьте важность задачи'),
				description: yup.string().trim(),
				statusTask: yup.string().trim()
			}),
			initialValues: {
				importance: 'current',
				statusTask: 'awaits'	
			},
		});

		const [title, titleAttrs] = defineField('title');
		const [deadline, deadlineAttrs] = defineField('deadline');
		const [importance, importanceAttrs] = defineField('importance');
		const [description, descriptionAttrs] = defineField('description');
		const [statusTask, statusTaskAttrs] = defineField('statusTask');
		
		const createTask = handleSubmit (values => {
			const newTask = {
				...values,date: Date.now()
			}
			store.dispatch('request/createTask', newTask)
			close()
			resetForm()
			router.push('/')
		});	

		const isModal = computed ( () => props.isModal )
		
		function close () {
			context.emit('close')
		}

		return{
			isModal,
			values, 
			errors,
			close,
			createTask,
			title,
			titleAttrs,
			deadline,
			deadlineAttrs,
			description,
			descriptionAttrs,
			statusTask,
			statusTaskAttrs,
			importance,
			importanceAttrs,
		} 
	}

}
</script>

<style>

</style>