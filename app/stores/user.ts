import type { User, UserForm } from '@/types'
import Cookie from 'cookie'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { useGlobalStore } from './global'

export const useUserStore = defineStore('user', () => {
	const router = useRouter()
	const mainStore = useGlobalStore()
	const jwtToken = useCookie('jwt-token')

	const token = ref<string>()
	const user = ref<User>()

	const isAuth = computed(() => Boolean(token.value))

	const setUser = (payload: User) => {
		user.value = payload
	}

	const setToken = (newToken: string) => {
		token.value = newToken
		jwtToken.value = newToken
	}

	const logout = () => {
		token.value = undefined
		user.value = undefined
		jwtToken.value = null
		mainStore.setMessage({
			text: 'Successful logout',
			color: 'info',
		})
	}

	const login = async (userForm: UserForm) => {
		mainStore.loading = true
		try {
			const res = await $fetch<any>('/auth/login', { body: userForm, method: 'POST' })
			const { token, text, color } = res
			const user = decodeJWT(token)
			if (user) {
				setUser(user)
				setToken(token)
				router.push({ name: 'index' })
			}
			mainStore.setMessage({ text, color })
		} finally {
			mainStore.loading = false
		}
	}

	const createUser = async (userForm: UserForm) => {
		mainStore.loading = true
		try {
			const res = await $fetch<any>('/auth/create', { method: 'POST', body: userForm })
			const { text, color } = res
			router.push({ name: 'login' })
			mainStore.setMessage({ text, color })
		} finally {
			mainStore.loading = false
		}
	}

	const autoLogin = () => {
		const cookieStr = document.cookie
		const cookies = Cookie.parse(cookieStr || '') || {}
		const token = cookies['jwt-token']
		if (token) {
			if (isJWTValid(token)) {
				setToken(token)
				setUser(decodeJWT(token))
			} else {
				logout()
			}
		}
	}

	return {
		token,
		isAuth,
		user,

		setUser,
		setToken,
		logout,
		autoLogin,
		createUser,
		login,
	}
})

function isJWTValid(token: string) {
	if (!token) {
		return false
	}
	const jwtData = decodeJWT(token)
	const expires = jwtData.exp || 0
	return new Date().getTime() / 1000 < expires
}

function decodeJWT(token: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return jwtDecode<any>(token) || {}
}
