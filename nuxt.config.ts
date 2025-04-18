import { fileURLToPath, URL } from 'node:url'

const meta = {
	title: 'Girls in Armor',
	description:
		'Discover the elegance and strength of armored princesses, showcasing their beauty and resilience in stunning visuals.',
	thumbnail:
		'https://firebasestorage.googleapis.com/v0/b/girls-in-armor.appspot.com/o/lone-social%2Fgia bg.jpg?alt=media',
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
	sourcemap: false,

	alias: {
		'@': fileURLToPath(new URL('./app', import.meta.url)),
	},

	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@nuxt/icon',
		'@nuxt/scripts',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-easy-lightbox',
		'nuxt-zod-i18n',
	],

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		public: {
			baseUrl: '/api',
			waifuItToken: process.env.WAIFU_IT_TOKEN,
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

	zodI18n: {},
})
