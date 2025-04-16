<script setup lang="ts">
	import type { Waifu } from '~/types'

	defineProps<{
		waifu: Waifu
	}>()
</script>

<template>
	<div class="bg-main flex w-full flex-col overflow-hidden rounded-lg pb-2 shadow-lg">
		<img class="min-h-48 w-full object-cover" :src="waifu.imgUrl" :alt="waifu.name" />

		<div class="flex h-full flex-col justify-between gap-4 p-4">
			<div class="space-y-2">
				<h4 class="line-clamp-1 text-xl font-bold">{{ waifu.title }}</h4>
				<p class="line-clamp-2 text-gray-700">
					{{ waifu.description }}
				</p>
			</div>

			<div>
				<span
					class="bg-primary inline-block rounded-full px-3 py-1 text-sm font-semibold text-neutral-50"
				>
					{{ waifu.user }}
				</span>
			</div>
		</div>
	</div>
</template>
