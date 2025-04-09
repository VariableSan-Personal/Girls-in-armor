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
	<section class="flex h-screen w-full">
		<div class="relative w-1/2 cursor-pointer" @click="toggle('alter')">
			<img :src="alterSaberSrc" alt="AlterSaber" class="h-full w-full object-cover object-top" />

			<div class="absolute inset-0 flex items-center justify-center p-4" :style="leftOverlayStyle">
				<div v-if="active === 'saber'" class="text-center text-lg italic">
					{{ saberQuote }}
				</div>
			</div>
		</div>

		<div class="relative w-1/2 cursor-pointer" @click="toggle('saber')">
			<img :src="saberSrc" alt="Saber" class="h-full w-full object-cover object-top" />

			<div class="absolute inset-0 flex items-center justify-center p-4" :style="rightOverlayStyle">
				<div v-if="active === 'alter'" class="text-center text-lg italic">
					{{ alterQuote }}
				</div>
			</div>
		</div>
	</section>
</template>
