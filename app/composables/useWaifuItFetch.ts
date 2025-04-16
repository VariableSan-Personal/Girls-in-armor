import type { WaifuItImage } from '~/types'

export function useWaifuItFetch(len = 5) {
	const config = useRuntimeConfig()
	const url = 'https://waifu.it/api/v4/waifu'

	const fetchPromises = Array.from({ length: len }).map(() =>
		$fetch<WaifuItImage>(url, {
			headers: {
				Authorization: config.public.waifuItToken,
			},
		}).catch((error) => {
			console.error('Fetch failed:', error)
			return null
		})
	)

	return Promise.allSettled(fetchPromises)
}
