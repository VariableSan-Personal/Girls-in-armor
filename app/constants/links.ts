import type { Link } from '~/types'

export const LINKS: Link[] = [
	{
		title: 'Home',
		route: 'index',
		icon: 'mdi-home',
		exact: true,
	},
	{
		title: 'Waifu list',
		route: 'waifu-list',
		icon: 'mdi-format-list-bulleted',
		exact: true,
	},
]
