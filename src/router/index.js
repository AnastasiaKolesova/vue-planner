import { createRouter, createWebHistory } from "vue-router"
import { store } from '../store'
import Home from '../views/Home'
import Task from '../views/Task'
import CompletedTasks from '../views/CompletedTasks'
import Auth from '../views/Auth'
import Reg from '../views/Reg'


export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
			meta: {
				layout: 'main',
				auth: true
			}
		},
		{
			path: '/task/:taskId?',
			component: Task,
			meta: {
				layout: 'main',
				auth: true
			}
		},
		{
			path: '/completed',
			component: CompletedTasks,
			meta: {
				layout: 'main',
				auth: true
			}
		},
		{
			path: '/auth',
			component: Auth,
			meta: {
				layout: 'auth'
			}
		},
		{
			path: '/reg',
			component: Reg,
			meta: {
				layout: 'auth'
			}
		},
	],
	linkActiveClass: 'active',
	linkExactActiveClass: 'active',
})


router.beforeEach((to, from, next) => {
	const requireAuth = to.meta.auth

	if(requireAuth && store.getters['auth/isAuthenticated']) {
		next()
	} else if (requireAuth && !store.getters['auth/isAuthenticated']){
		next('/auth?message=auth')
	} else {
		next()
	}
})






// import { createRouter, createWebHistory } from "vue-router"
// import Home from '../views/Home.vue'
// import Task from '../views/Task'
// import CompletedTasks from '../views/CompletedTasks'
// import Auth from '@/views/Auth.vue'

// const routes = [
// 	{ 
// 		path: '/', 
// 		name: 'Home',
// 		component: 'Home',
// 		meta: {
// 			layout: 'main'
// 		}
// 	},
// 	{ 
// 		path: '/task/:taskId?',
// 		name: 'Task ',
// 		component: Task,
// 		meta: {
// 			layout: 'main'
// 		}

// 	},
// 	{ 
// 		path: '/completed',
// 		name: 'CompletedTasks',
// 		component: CompletedTasks,
// 		meta: {
// 			layout: 'main'
// 		}

// 	},
// 	{ 
// 		path: '/auth',
// 		name: 'Auth',
// 		component: Auth,
// 		meta: {
// 			layout: 'auth'
// 		}

// 	},
// ]

// const router = createRouter({
// 	history: createWebHistory(),
// 	routes
// })

// router.beforeEach((to, from, next) => {

// })