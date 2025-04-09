import type { SnackbarMessage } from '@/types'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
	const colorMode = useColorMode()

	const snackbar = ref(false)
	const message = ref<SnackbarMessage>()
	const loading = ref(false)
	const drawer = ref(false)

	const isDark = computed({
		get() {
			return colorMode.value === 'dark'
		},
		set() {
			colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
		},
	})

	const toggleDark = () => {
		isDark.value = !isDark.value
	}

	const setMessage = (newMessage: SnackbarMessage) => {
		message.value = newMessage
		snackbar.value = true
	}

	const toggleLoading = () => {
		loading.value = !loading.value
	}

	return {
		message,
		snackbar,
		loading,
		isDark,
		drawer,

		setMessage,
		toggleLoading,
		toggleDark,
	}
})
