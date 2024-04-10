<template>
	<div class="container">
		<form class="card login" @submit.prevent="registration">
			<div class="mt-1">Используйте любую почту и пароль, подтверждение через почтовый аккаунт не требуется</div>
			<div class="form-control  mt-1">
				<label for="email">Введите email</label>
				<input name="email" type="text" id="email" v-model="email" v-bind="emailAttrs">
				<small class="text-danger">{{ errors.email }}</small>
			</div>
			<div class="form-control">
				<label for="password">Придумайте пароль</label>
				<input name="password" :type="isShow ? 'password' : 'text' " id="password" v-model="password" v-bind="passwordAttrs">
				<a href="#" @click="isShow = !isShow"> {{ isShow ? 'Показать' : 'Скрыть' }} пароль</a><br>
				<small class="text-danger">{{ errors.password }}</small>
			</div>

			<div class="btns mt-1">
				<button class="btn primary">Зарегистрироваться</button>
				<router-link class="link" to="/auth">Вернуться к авторизации</router-link>
			</div>
		</form>
	</div>
</template>

<script>
import {useRegistration} from '../use/registration.js'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {error} from '../../utils/error' 

export default {
	setup() {
		const route = useRoute()
		const store = useStore()

		if (route.query.message){
			store.dispatch('setMessage', {
				value: error(route.query.message)
			})
		}

		return { ...useRegistration()}
	}
}
</script>

<style>

</style>