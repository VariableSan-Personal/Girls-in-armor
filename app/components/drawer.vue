<script setup lang="ts">
	const links = useLinks()
	const globalStore = useGlobalStore()
</script>

<template>
	<nav
		:class="globalStore.drawer ? 'translate-x-0' : '-translate-x-full'"
		class="bg-drawer fixed top-0 left-0 z-[210] min-h-full w-7/12 transform px-4 py-12 transition-all duration-300 ease-in-out sm:w-64"
	>
		<ul class="space-y-4">
			<template v-for="(link, index) in links" :key="index">
				<li v-if="link.condition">
					<NuxtLink
						v-if="link.routeName"
						tabindex="-1"
						class="duration flex items-center gap-2 rounded-lg p-2 transition-colors"
						exact-active-class="bg-gray-300 font-bold text-black"
						:to="{ name: link.routeName }"
						@click="globalStore.drawer = false"
					>
						<Icon :name="link.icon" />
						{{ link.title }}
					</NuxtLink>

					<button v-else variant="link" class="link" @click="link.onClick">
						<Icon :name="link.icon" />
						{{ link.title }}
					</button>
				</li>
			</template>
		</ul>
	</nav>

	<transition
		enter-from-class="opacity-0"
		enter-active-class="ease-out transition-medium"
		enter-to-class="opacity-100"
		leave-class="opacity-100"
		leave-active-class="ease-out transition-medium"
		leave-to-class="opacity-0"
	>
		<div v-show="globalStore.drawer" class="fixed inset-0 z-[200] cursor-pointer transition-opacity">
			<div
				class="absolute inset-0 bg-black opacity-50"
				tabindex="0"
				@click="globalStore.drawer = false"
			/>
		</div>
	</transition>
</template>

<style>
	.bg-drawer {
		background-color: var(--ui-neutral);
	}
</style>
