<script lang="ts" setup>
	const { changeLocale, toggleDark } = useAction()
</script>

<template>
	<div class="absolute top-0 left-0 z-[100] flex min-h-[52px] w-full items-center text-white">
		<UContainer>
			<div class="flex items-center justify-between gap-4">
				<Logo />

				<div class="flex gap-2">
					<UButton
						variant="ghost"
						class="text-inherit"
						size="sm"
						icon="mdi-translate"
						@click="changeLocale"
					/>
					<UButton
						variant="ghost"
						class="text-inherit"
						icon="mdi-theme-light-dark"
						size="sm"
						@click="toggleDark"
					/>
				</div>
			</div>
		</UContainer>
	</div>
</template>
