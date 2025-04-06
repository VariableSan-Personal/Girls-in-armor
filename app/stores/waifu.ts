// import type { ExtendedWaifu, Waifu } from '@/types'
// import { defineStore } from 'pinia'
// import swal from 'sweetalert2'
// import { useGlobalStore } from './global'

// type ModeType = 'waifu' | 'moderate'

// interface EditingWaifuParams {
// 	forceUpdate: boolean
// }

// export const useWaifuStore = defineStore('waifu', () => {
// 	const mainStore = useGlobalStore()
// 	const router = useRouter()

// 	const waifuList = ref<Waifu[]>([])
// 	const pagination = ref(1)
// 	const totalPages = ref(0)
// 	const mode = ref<ModeType>('waifu')

// 	const setWaifuList = (payload: Waifu[]) => {
// 		waifuList.value = payload
// 	}

// 	const setPagination = (payload: number) => {
// 		pagination.value = payload
// 	}

// 	const getWaifuListFromServer = async () => {
// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.post('/list', {
// 				page: pagination.value,
// 				limit: 12,
// 			})
// 			const waifus = res.data
// 			setWaifuList(waifus.docs)
// 			totalPages.value = waifus.totalPages
// 			mode.value = 'waifu'
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}

// 	const saveWaifu = async (character: Partial<ExtendedWaifu>) => {
// 		const formData = new FormData()

// 		if (character.imageFile?.length) {
// 			formData.append('image', character.imageFile[0])
// 		} else {
// 			return mainStore.setMessage({
// 				text: 'The image was not selected',
// 				color: 'error',
// 			})
// 		}

// 		for (const key in character) {
// 			if (key !== 'imageFile') {
// 				const element = (character as any)[key]
// 				formData.append(key, element)
// 			}
// 		}

// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.post('/add', formData, {
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 				},
// 			})
// 			const message = res.data
// 			mainStore.setMessage(message)
// 			router.push({ name: RouterKeys.WAIFU_PAGE })
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}
// 	const removeWaifu = async (
// 		id: string,
// 		routeLink?: RouterKeys,
// 		params?: Partial<EditingWaifuParams>
// 	) => {
// 		const userConfirm = await swal.fire({
// 			title: 'Are you sure?',
// 			text: "You won't be able to revert this",
// 			icon: 'warning',
// 			showCancelButton: true,
// 			confirmButtonColor: '#3085d6',
// 			cancelButtonColor: '#d33',
// 			confirmButtonText: 'Yes, delete it',
// 			scrollbarPadding: false,
// 		})
// 		if (!userConfirm.value) {
// 			return
// 		}

// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.delete('/list/remove', {
// 				data: {
// 					id,
// 				},
// 			})
// 			const message = res.data
// 			mainStore.setMessage(message)
// 			if (routeLink) {
// 				const query = <any>{}
// 				if (params?.forceUpdate) {
// 					query.forceUpdate = true
// 				}
// 				router.push({
// 					name: routeLink,
// 					query,
// 				})
// 			} else {
// 				getWaifuListFromServer()
// 			}
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}

// 	const getModerateListFromServer = async () => {
// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.post('/moderate/list', {
// 				page: pagination.value,
// 				limit: 12,
// 			})
// 			const moderates = res.data
// 			waifuList.value = moderates.docs
// 			totalPages.value = moderates.totalPages
// 			mode.value = 'moderate'
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}

// 	const rejectWaifu = async (id: string, routeLink?: RouterKeys) => {
// 		const userConfirm = await swal.fire({
// 			title: 'Are you sure?',
// 			text: "You won't be able to revert this",
// 			icon: 'warning',
// 			showCancelButton: true,
// 			confirmButtonColor: '#3085d6',
// 			cancelButtonColor: '#d33',
// 			confirmButtonText: 'Yes, reject it',
// 			scrollbarPadding: false,
// 		})
// 		if (!userConfirm.value) {
// 			return
// 		}
// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.delete('/moderate/remove', {
// 				data: {
// 					id,
// 				},
// 			})
// 			const message = res.data
// 			mainStore.setMessage(message)
// 			if (routeLink) {
// 				return router.push({ name: routeLink })
// 			}
// 			getModerateListFromServer()
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}

// 	const acceptWaifu = async (id: string, routeLink?: RouterKeys) => {
// 		const userConfirm = await swal.fire({
// 			title: 'Are you sure?',
// 			text: "You won't be able to revert this",
// 			icon: 'warning',
// 			showCancelButton: true,
// 			confirmButtonColor: '#3085d6',
// 			cancelButtonColor: '#d33',
// 			confirmButtonText: 'Yes, accept it',
// 			scrollbarPadding: false,
// 		})
// 		if (!userConfirm.value) {
// 			return
// 		}

// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.post('/moderate/add', {
// 				id,
// 			})
// 			const message = res.data
// 			mainStore.setMessage(message)
// 			if (routeLink) {
// 				return router.push({ name: routeLink })
// 			}
// 			getModerateListFromServer()
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}

// 	const clearWaifuData = () => {
// 		waifuList.value = []
// 		pagination.value = 1
// 		totalPages.value = 0
// 	}

// 	const backToModerate = async (id: string, routerLink?: RouterKeys) => {
// 		const userConfirm = await swal.fire({
// 			title: 'Are you sure?',
// 			text: "You won't be able to revert this",
// 			icon: 'warning',
// 			showCancelButton: true,
// 			confirmButtonColor: '#3085d6',
// 			cancelButtonColor: '#d33',
// 			confirmButtonText: 'Yes, submit for moderation',
// 			scrollbarPadding: false,
// 		})
// 		if (!userConfirm.value) {
// 			return
// 		}

// 		mainStore.loading = true
// 		try {
// 			const res = await axiosStore.post('/moderate/back-to-moderate', { id })
// 			const message = res.data
// 			mainStore.setMessage(message)
// 			if (routerLink) {
// 				return router.push({ name: routerLink })
// 			}
// 			getWaifuListFromServer()
// 		} finally {
// 			mainStore.loading = false
// 		}
// 	}

// 	return {
// 		waifuList,
// 		pagination,
// 		totalPages,
// 		mode,

// 		removeWaifu,
// 		saveWaifu,
// 		getWaifuListFromServer,
// 		setWaifuList,
// 		setPagination,
// 		getModerateListFromServer,
// 		rejectWaifu,
// 		acceptWaifu,
// 		clearWaifuData,
// 		backToModerate,
// 	}
// })
