<script lang="ts" setup>
	import * as locales from '@nuxt/ui/locale'
	const { locale } = useI18n()

	const lang = computed(() => locales[locale.value].code)
	const dir = computed(() => locales[locale.value].dir)

	useHead({
		htmlAttrs: {
			lang,
			dir,
		},
	})
</script>

<template>
	<UApp>
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
