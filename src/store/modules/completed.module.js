import {store} from '../index'
import axios from 'axios'

export default {
	namespaced: true,
	state() {
		return {
			tasksCompleted: [],
		}
	},
	mutations: {
		completeTask(state, payload) {
			state.tasksCompleted.push(payload)
		},
		setCompletedTasks(state, responce) {
			state.tasksCompleted = responce
		},
		deleteTask(state, payload) {
			const idx = state.tasksCompleted.findIndex(t => t.id == payload)
			state.tasksCompleted.splice(idx, 1)
		},
	},
	actions: {

		async completeTask( { commit }, payload) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']

				const { data } = await axios.post(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasksCompleted.json?auth=${token}`, payload)

				//присваиваем id обязательно! если не присвоить, то будет баг: 
				//при создании новой задачи не сможем открыть, т.к. ищем по id, а id только после обновления
				//мы его присвоим принудительно 
				commit('completeTask', { ...payload, id: data.name})
			} catch (e) {
				console.log(e);
			}
		},


		async setCompletedTasks({ commit }) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']

				const { data } = await axios.get(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasksCompleted.json?auth=${token}`)
				//получаем объекты с ключом и значением
				//Object.keys(data) - делает из объекта массив по ключам. 
				// .map(key => ({...data[key], key})) - перебирает значения кажого ключа, и на каждой иттерации 
				// разворачивает массив по ключу (id) и в него помещает его же ключ. Key переименован в id для удобства дальнейшей работы 
				const responce = Object.keys(data).map(id => ({ ...data[id], id }))
				commit('setCompletedTasks', responce)
			} catch (e) {
				console.log(e);
			}
		},

		async deleteTask({ commit }, id) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']

				const { data } = await axios.delete(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasksCompleted/${id}.json?auth=${token}`)
				
				commit('deleteTask', id)

			} catch (e) {
				console.log(e);
			}
		},
	},
	getters: {
		tasksCompleted(state) {
			return state.tasksCompleted
		},
	}
}