<template>
  <div :class="['mt-1','badge', className]"> 
	{{text}}
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
	props: ['type'],

	setup(props) {
		

		const textMap = {
			awaits: 'Ожидает выполнения',
			'at-work': 'В работе',
			canceled: 'Отменена',
			completed: 'Завершена',
		}

		const classMap = {
			awaits: 'warning',
			'at-work': 'primary',
			canceled: 'danger',
			completed: 'primary',
		}
		
		watch(props, newType => {
			text.value = textMap[newType.type]
			className.value = classMap[props.type]
		})

		const text = ref(textMap[props.type])
		const className = ref(classMap[props.type])

		return {
			text,
			className
		}
	}

}
</script>

<style>

</style>