import { fileURLToPath, URL } from 'node:url'

const meta = {
	title: 'Girls in Armor',
	description: '',
	thumbnail: '',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/png', href: 'shield.svg' }],
			title: meta.title,
			meta: [
				{ key: 'description', name: 'description', content: meta.description },
				{ key: 'og:title', property: 'og:title', content: meta.title },
				{ key: 'og:description', property: 'og:description', content: meta.description },
				{ key: 'og:image', property: 'og:image', content: meta.thumbnail },
				{ key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
				{ key: 'twitter:title', name: 'twitter:title', content: meta.title },
				{ key: 'twitter:description', name: 'twitter:description', content: meta.description },
				{ key: 'twitter:image', name: 'twitter:image', content: meta.thumbnail },
			],
		},
	},

	devtools: { enabled: false },

	alias: {
		'@': fileURLToPath(new URL('./app', import.meta.url)),
	},

	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-easy-lightbox',
	],

	css: ['~/assets/css/main.css'],
	postcss: {},

	runtimeConfig: {
		public: {
			baseUrl: '/api',
		},
	},

	i18n: {
		locales: [
			{ code: 'ru', file: 'ru.json' },
			{ code: 'en', file: 'en.json' },
		],
		defaultLocale: 'en',
		strategy: 'no_prefix',
	},

	ui: {
		theme: {
			colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'neutral'],
		},
	},

	icon: {
		customCollections: [
			{
				prefix: 'custom',
				dir: './public',
			},
		],
	},

	future: {
		compatibilityVersion: 4,
	},

	compatibilityDate: '2024-11-27',

	hooks: {
		close: (nuxt) => {
			if (!nuxt.options._prepare) {
				process.exit(0)
			}
		},
	},
})
