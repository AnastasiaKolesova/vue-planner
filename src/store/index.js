import { createStore, createLogger } from "vuex";
import requestModule from "./modules/request.module"
import completedModule from "./modules/completed.module"
import authModule from "./modules/auth.module"
import regModule from "./modules/reg.module"

const plugins = []

if(process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}

export const store = createStore({
	plugins,
	state() {
		return {
			message: null
		}
	},
	mutations: {
		setMessage(state, message) {
			state.message = message
		},
		clearMessage(state) {
			state.message = null
		}
	},
	actions: {
		setMessage({ commit }, message) {
			commit('setMessage', message)
			setTimeout(() => {
				commit('clearMessage')
			}, 5000)
		}
	},
	getters:{
		message(state) {
			return state.message
		}
	},
	modules: {
		request: requestModule,
		completed: completedModule,
		auth: authModule,
		reg: regModule,
	}
})