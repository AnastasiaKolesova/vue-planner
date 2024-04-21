<template>
		<form class="card" @submit.prevent="login">
			<div class="form-custom">
				<label for="email">Email</label>
				<input name="email" type="text" id="email" v-model="email" v-bind="emailAttrs">
				<small class="text-danger">{{ errors.email }}</small>
			</div>
			<div class="form-custom">
				<label for="password">Пароль</label>
				<input name="password" :type="isShow ? 'password' : 'text' " id="password" v-model="password" v-bind="passwordAttrs">
				<a href="#" @click="isShow = !isShow"> {{ isShow ? 'Показать' : 'Скрыть' }} пароль</a><br>
				<small class="text-danger">{{ errors.password }}</small>
			</div>

			<div class="card__btns">
				<button class="btn primary">Войти</button>
				<router-link class="block__item"  to="/reg">Нет аккаунта? Зарегистрироваться</router-link>
			</div>
		</form>
</template>

<script>
import {useLogin} from '../use/login.js'
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

		return { ...useLogin()}
	}
}
</script>

<style>

</style>