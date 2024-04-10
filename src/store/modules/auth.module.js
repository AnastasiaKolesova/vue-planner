import axios from "axios"
import { store } from '../index'

import { error } from '../../../utils/error'
const TOKEN_KEY = 'jwt-token'
const U_ID = 'u-id'

export default {
	namespaced: true,
	state() {
		return {
			token: localStorage.getItem(TOKEN_KEY),
			userLocalId: localStorage.getItem(U_ID),
		}
	},
	mutations: {
		setUser(state, localId){
			state.userLocalId = localId
			localStorage.setItem(U_ID, localId)
			console.log(state.userLocalId);
		},

		setToken(state, token) {
			state.token = token
			localStorage.setItem(TOKEN_KEY, token)
		},
		logout(state) {
			state.token = null
			state.userLocalId = null
			store.commit('request/clearTasks')
			localStorage.removeItem(TOKEN_KEY)
			localStorage.removeItem(U_ID)
		}
	},
	actions: {
		async login({ commit, dispatch }, payload) {
			try {
				const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
				const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
				commit('setUser', data.localId)
				commit('setToken', data.idToken)
				commit('clearMessage', null, {root: true})
			} catch (e) {
				dispatch('setMessage', {
					value: error(e.response.data.error.message)
				}, {root: true})
				throw new Error()
			}
		},
	},
	getters: {
		token(state) {
			return state.token
		},
		isAuthenticated(_, getters) {
			return !!getters.token
		},
		userLocalId(state){
			return state.userLocalId
		}
	}
}