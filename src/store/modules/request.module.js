import { store } from '../index'
import axios from 'axios'
import { error } from '../../../utils/error'

export default {
	namespaced: true,
	state() {
		return {
			tasks: [],
		}
	},
	mutations: {

		clearTasks (state) {
			state.tasks = []
		},
		//пушим новую задачу в массив
		createTask(state, payload) {
			state.tasks.push(payload)
		},

		setTasks(state, responce) {
			state.tasks = responce
		},

		deleteTask(state, payload) {
			const idx = state.tasks.findIndex(t => t.id == payload)
			state.tasks.splice(idx, 1)
		},
	},
	actions: {
		//отправляем новую задачу в базу данных
		async createTask({ commit }, payload) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']
				const { data } = await axios.post(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasks.json?auth=${token}`, payload)

				//присваиваем id обязательно! если не присвоить, то будет баг: 
				//при создании новой задачи не сможем открыть, т.к. ищем по id, а id только после обновления
				//мы его присвоим принудительно 
				commit('createTask', { ...payload, id: data.name })
			} catch (e) {
				console.log(e);
			}
		},

		//получем все задачи, которые есть в БД
		async setTasks({ commit }) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']
				const { data } = await axios.get(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasks.json?auth=${token}`)
				//получаем объекты с ключом и значением
				//Object.keys(data) - делает из объекта массив по ключам. 
				// .map(key => ({...data[key], key})) - перебирает значения кажого ключа, и на каждой иттерации 
				// разворачивает массив по ключу (id) и в него помещает его же ключ. Key переименован в id для удобства дальнейшей работы 
				const responce = Object.keys(data).map(id => ({ ...data[id], id }))
				commit('setTasks', responce)
			} catch (e) {
				console.log(e);
			}
		},
		async setMyTask(_, id) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']
				const { data } = await axios.get(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasks/${id}.json?auth=${token}`)
				return data
			} catch (e) {
				console.log(e);
			}
		},
		async deleteTask({ commit }, id) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']
				const { data } = await axios.delete(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasks/${id}.json?auth=${token}`)
				commit('deleteTask', id)

			} catch (e) {
				console.log(e);
			}
		},
		async updateTask({ commit }, data) {
			try {
				const token = store.getters['auth/token']
				const userLocalId = store.getters['auth/userLocalId']
				await axios.put(`https://planner-base-tasks-default-rtdb.firebaseio.com/users/${userLocalId}/tasks/${data.id}.json?auth=${token}`, data)
			} catch (e) {
				dispatch('setMessage', {
					value: error(e.response.data.error.message)
				}, {root: true})
				console.log(e);
			}
		},

	},
	getters: {
		tasks(state) {
			return state.tasks
		},
	}
}