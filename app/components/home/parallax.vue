<script lang="ts" setup>
	import clouds from '@/assets/images/clouds2-min.png'
	import jeanne from '@/assets/images/Jeanne darc-min.png'
	import mobileBg from '@/assets/images/mobile-bg.jpg'
	import moon from '@/assets/images/moon-min.png'
	import road from '@/assets/images/road-min.png'
	import sky from '@/assets/images/sky-min.png'

	const images = [
		{ src: clouds, name: 'clouds' },
		{ src: jeanne, name: 'jeanne' },
		{ src: moon, name: 'moon' },
		{ src: road, name: 'road' },
		{ src: sky, bg: true, name: 'sky' },
	]

	const getImageClasses = (image: Record<string, unknown>) => {
		const base = 'absolute top-0 left-0 w-full hidden sm:block'

		const zIndex = image.bg ? 'z-0' : 'z-10'
		let extra = ''

		switch (image.name) {
			case 'clouds':
				extra =
					'z-20 xl:top-[-30%] xl:left-[-10%] xl:scale-[1.2] xl:animate-[clouds_10s_ease-in-out_alternate_infinite]'
				break
			case 'jeanne':
				extra = 'z-40'
				break
			case 'moon':
				extra = 'z-10 xl:top-[-90px] xl:animate-[moon_10s_ease-in-out_alternate_infinite]'
				break
			case 'road':
				extra = 'z-30 scale-[1.05]'
				break
			case 'sky':
				extra = 'z-0 top-[-5px] w-full xl:animate-[sky_15s_ease-in-out_alternate_infinite]'
				break
			default:
				break
		}
		return `${base} ${zIndex} ${extra}`
	}
</script>

<template>
	<section
		class="relative min-h-0 overflow-hidden before:absolute before:bottom-0 before:left-0 before:z-50 before:h-[25%] before:w-full before:bg-gradient-to-t before:from-black before:to-transparent before:content-[''] sm:min-h-[50vh] lg:min-h-[70vh] xl:min-h-[90vh] 2xl:min-h-[100vh]"
	>
		<img
			v-for="(image, index) in images"
			:key="index"
			:src="image.src"
			:class="getImageClasses(image)"
		/>
		<img class="block w-full object-cover sm:hidden" :src="mobileBg" />
	</section>
</template>

<style>
	@keyframes sky {
		0% {
			top: -5px;
		}
		100% {
			top: -100px;
		}
	}
	@keyframes clouds {
		0% {
			left: -10%;
		}
		100% {
			left: 10%;
		}
	}
	@keyframes moon {
		0% {
			top: -90px;
		}
		100% {
			top: 0;
		}
	}
</style>
