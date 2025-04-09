export function useAction() {
	const userStore = useUserStore()
	const mainStore = useGlobalStore()
	const router = useRouter()
	const { setLocale, locale, availableLocales } = useI18n()

	const logout = async () => {
		const { $swal } = useNuxtApp()

		const userConfirm = await $swal.fire({
			title: 'Do you want to log out?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, log out',
			scrollbarPadding: false,
		})
		if (!userConfirm.value) {
			return
		}

		userStore.logout()
		mainStore.setMessage({
			text: 'You are successfully logged out',
			color: 'success',
		})
		router.push({ name: 'index' })
	}

	const changeLocale = () => {
		const newLocale = availableLocales.find((el) => el !== locale.value) || 'en'
		setLocale(newLocale)
	}

	const toggleDrawer = () => {
		mainStore.drawer = !mainStore.drawer
	}

	return {
		logout,
		changeLocale,
		toggleDrawer,
		toggleDark: mainStore.toggleDark,
	}
}
