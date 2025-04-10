import type { Waifu } from '@/types'

export const useWaifuStore = defineStore('waifu', () => {
	const waifuList = ref<Waifu[]>([])
	const pagination = ref(1)
	const totalPages = ref(0)

	return {
		waifuList,
		pagination,
		totalPages,
	}
})
