export function useLinks() {
	const { t } = useI18n()
	const userStore = useUserStore()
	const { logout } = useAction()

	const links = computed(() => [
		{
			title: t('home'),
			routeName: 'index',
			icon: 'mdi-home',
			condition: true,
		},
		{
			title: t('waifu-list'),
			routeName: 'waifu-list',
			icon: 'mdi-format-list-bulleted',
			condition: true,
		},
		{
			title: t('moderation'),
			routeName: 'waifu-moderation',
			icon: 'mdi-microsoft-access',
			condition: userStore.user?.permission,
		},
		{
			title: t('waifu-create'),
			routeName: 'waifu-create',
			icon: 'mdi-plus',
			condition: userStore.isAuth,
		},
		{
			title: t('login'),
			routeName: 'login',
			icon: 'mdi-login',
			condition: !userStore.isAuth,
		},
		{
			title: t('register'),
			routeName: 'register',
			icon: 'mdi-account-plus',
			condition: !userStore.isAuth,
		},
		{
			title: t('logout'),
			icon: 'mdi-logout',
			condition: userStore.isAuth,
			onClick: logout,
		},
	])

	return links
}
