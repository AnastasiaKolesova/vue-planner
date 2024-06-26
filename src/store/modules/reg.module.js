import axios from "axios"
import { error } from '../../../utils/error'
const TOKEN_KEY = 'jwt-token'

export default {
	namespaced: true,
	state() {
		return {
			token: localStorage.getItem(TOKEN_KEY)
		}
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			localStorage.setItem(TOKEN_KEY, token)
		},
		logout(state) {
			state.token = null
			localStorage.removeItem(TOKEN_KEY)
		}
	},
	actions: {
		async registration({ commit, dispatch }, payload) {
			try {
				const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
				const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
				console.log(data);
				commit('setToken', data.idToken)
				commit('clearMessage', null, {root: true})
			} catch (e) {
				dispatch('setMessage', {
					value: error(e.response.data.error.message)
				}, {root: true})
				throw new Error()
			}

			commit('setToken', 'TEST TOKEN')
		},
	},
	getters: {
		token(state) {
			return state.token
		},
		isAuthenticated(_, getters) {
			return !!getters.token
		}
	}
}