<script lang="ts" setup>
	import type { Waifu } from '~/types'

	const waifuList = ref<Waifu[]>([])
</script>

<template>
	<div>
		<UContainer>
			<div class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
				<WaifuCard v-for="(waifu, index) in waifuList" :key="index" class="h-[400px]" :waifu />
			</div>
		</UContainer>
	</div>
</template>
