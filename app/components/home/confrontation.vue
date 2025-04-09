<script setup lang="ts">
	import alterSaberSrc from '@/assets/images/confrontation/alter-saber.jpg'
	import saberSrc from '@/assets/images/confrontation/saber.jpg'

	const active = ref<null | 'alter' | 'saber'>(null)

	const alterQuote =
		'If you do evil out of a hatred for evil, that rage and hate will merely birth new conflict. Rise above and break the cycle.'
	const saberQuote =
		'Of what worth is a king who fails to protect the powerless? True strength lies in defending those who cannot defend themselves.'

	const alterFillColor = '#121212'
	const saberFillColor = '#e5ecf6'

	const leftOverlayStyle = computed(() => {
		if (active.value === 'saber') {
			return {
				clipPath: 'circle(150% at 100% 50%)',
				backgroundColor: saberFillColor,
				color: alterFillColor,
				transition: 'clip-path 0.5s ease-in-out',
			}
		}
		return {
			clipPath: 'circle(0% at 100% 50%)',
			backgroundColor: saberFillColor,
			color: alterFillColor,
			transition: 'clip-path 0.5s ease-in-out',
		}
	})

	const rightOverlayStyle = computed(() => {
		if (active.value === 'alter') {
			return {
				clipPath: 'circle(150% at 0% 50%)',
				backgroundColor: alterFillColor,
				color: saberFillColor,
				transition: 'clip-path 0.5s ease-in-out',
			}
		}
		return {
			clipPath: 'circle(0% at 0% 50%)',
			backgroundColor: alterFillColor,
			color: saberFillColor,
			transition: 'clip-path 0.5s ease-in-out',
		}
	})

	function toggle(hero: 'alter' | 'saber') {
		active.value = active.value === hero ? null : hero
	}
</script>

<template>
	<section>
		<div class="hidden h-screen w-full sm:flex">
			<div class="relative w-1/2 cursor-pointer" @click="toggle('alter')">
				<img :src="alterSaberSrc" alt="AlterSaber" class="h-full w-full object-cover object-top" />

				<div
					class="absolute inset-0 flex items-center justify-center p-4"
					:style="leftOverlayStyle"
				>
					<div v-if="active === 'saber'" class="text-center text-lg italic">
						{{ saberQuote }}
					</div>
				</div>
			</div>

			<div class="relative w-1/2 cursor-pointer" @click="toggle('saber')">
				<img :src="saberSrc" alt="Saber" class="h-full w-full object-cover object-top" />

				<div
					class="absolute inset-0 flex items-center justify-center p-4"
					:style="rightOverlayStyle"
				>
					<div v-if="active === 'alter'" class="text-center text-lg italic">
						{{ alterQuote }}
					</div>
				</div>
			</div>
		</div>

		<div class="sm:hidden">
			<div class="flex flex-col">
				<div class="relative cursor-pointer overflow-hidden" @click="toggle('alter')">
					<img :src="alterSaberSrc" alt="AlterSaber" class="h-96 w-full object-cover object-top" />
					<transition name="slide-down">
						<div
							v-if="active === 'alter'"
							class="absolute inset-0 flex items-center justify-center bg-black/70 p-4"
						>
							<p class="text-center text-lg text-white italic">
								{{ saberQuote }}
							</p>
						</div>
					</transition>
				</div>

				<div class="relative cursor-pointer overflow-hidden" @click="toggle('saber')">
					<img :src="saberSrc" alt="Saber" class="h-96 w-full object-cover object-top" />
					<transition name="slide-down">
						<div
							v-if="active === 'saber'"
							class="absolute inset-0 flex items-center justify-center bg-black/70 p-4"
						>
							<p class="text-center text-lg text-white italic">
								{{ alterQuote }}
							</p>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.slide-down-enter-active,
	.slide-down-leave-active {
		transition:
			top 0.5s ease,
			opacity 0.5s ease;
	}
	.slide-down-enter-from {
		top: -100%;
		opacity: 0;
	}
	.slide-down-leave-to {
		top: 100%;
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
