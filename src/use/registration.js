import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'


export function useRegistration() {
	const store = useStore()
	const router = useRouter()
	const isShow = ref('false')

	const { errors, values, defineField, handleSubmit } = useForm({
		validationSchema: yup.object({
			email: yup.string().email('Введите корректный email').required('Введите логин'),
			password: yup.string().trim().required('Введите пароль').min(5, 'пароль должен быть не менее 5 символов'),
		})
	})

	const [email, emailAttrs] = defineField('email')
	const [password, passwordAttrs] = defineField('password')

	const registration = handleSubmit(async values => {
		try {
			await store.dispatch('reg/registration', values)
			alert('регистрация прошла успешно! Войдите в систему с новым логином и паролем =)')
			router.push('/')
		} catch (e) {}
	})

	return {
		registration,
		errors,
		isShow,
		email,
		emailAttrs,
		password,
		passwordAttrs,
	}
}