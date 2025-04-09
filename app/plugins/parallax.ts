import Parallax from 'parallax-js'

export default defineNuxtPlugin(() => {
	return {
		provide: { parallax: Parallax },
	}
})
