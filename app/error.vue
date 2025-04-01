<script setup lang="ts">
	import { useI18n } from 'vue-i18n'

	definePageMeta({
		layout: 'default',
	})

	const props = defineProps<{ error: Record<string, string | number> }>()

	const { t } = useI18n()

	const title = computed(() =>
		props.error?.statusCode === 404 ? t('errors.not-exist') : t('errors.something-went-wrong')
	)

	const handleError = () => {
		clearError({ redirect: '/' })
	}
</script>

<template>
	<div class="flex min-h-screen w-full flex-col items-center justify-center space-y-4">
		<div class="text-center">
			<h1>
				{{ title }}
			</h1>
			<p>
				{{ error?.message }}
			</p>
		</div>

		<UButton @click="handleError">
			{{ t('errors.return-home') }}
		</UButton>
	</div>
</template>
