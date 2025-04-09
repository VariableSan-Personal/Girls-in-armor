import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'

export function useApiFetch<T>(url: string, options?: FetchOptions): Promise<T> {
	const config = useRuntimeConfig()
	const jwtToken = useCookie('jwt-token')

	const customFetch = ofetch.create({ baseURL: config.public.baseUrl })

	return customFetch(url, {
		onRequest({ options }) {
			if (jwtToken) {
				options.headers.set('Authorization', `Bearer ${jwtToken.value}`)
			}
		},
		...options,
	}) as Promise<T>
}
